const contactForm = document.querySelectorAll('.contactForm .form-group')
const btn = document.querySelector('#btn')
const genError = document.querySelector('#errormessage')
const succesMessage = document.querySelector('#sendmessage')
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailBody = {
    email: "",
    message: "",
    name: "",
    subject: "",
}

const ShowResponse = (item, msg) => {
    item.style.display = 'block'
    const d = document.createElement('p')
    d.textContent = msg
    item.appendChild(d)
}
const removeResponse = (item) => {
    item.style.display = 'none'
    item.textContent = ''

}

function buildEmail() {
    contactForm.forEach((item) => {
        const val = item.childNodes[3]
        const msg = item.firstElementChild.dataset.msg
        if (item.firstElementChild['name'] === 'email') {
            item.firstElementChild.addEventListener('focus', () => removeResponse(val))
            item.firstElementChild.addEventListener('blur', function (e) {
                if (!e.target.value) {
                    ShowResponse(val, 'Email cannot be empty')
                }
                else if (regex.test(e.target.value)) {
                    emailBody.email = e.target.value

                } else {
                    ShowResponse(val, msg)
                }
            })
        } else {
            item.firstElementChild.addEventListener('focus', () => removeResponse(val))
            item.firstElementChild.addEventListener('blur', function (e) {
                if (!e.target.value) {
                    ShowResponse(val, msg)
                }
                else {
                    emailBody[item.firstElementChild['name']] = e.target.value
                }
            })
        }
    })
}

function validateForm(emailBody) {
    for (prop in emailBody) {
        if (!emailBody[prop]) {
            return false
        }
    }
    return true
}
buildEmail()
btn.addEventListener('click', handleSubmit)
async function handleSubmit(e) {
    e.preventDefault()
    const valid = validateForm(emailBody)
    if (valid) {
        const req = await fetch('https://arc-cleaning.herokuapp.com/email', {
            method: 'post',
            body: JSON.stringify(emailBody),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        }).catch(() => {
            ShowResponse(genError, 'Server  Error, please check your internet')
            setTimeout(() => removeResponse(genError), 2000)
        })

        const res = await req.json()
        if (res.status) {
            succesMessage.style.display = 'block'
        } else {
            ShowResponse(genError, 'Server  Error')
            setTimeout(() => removeResponse(genError), 2000)
        }
    } else {
        ShowResponse(genError, 'Error: One or More fields missing')
        setTimeout(() => removeResponse(genError), 2000)
    }

}






