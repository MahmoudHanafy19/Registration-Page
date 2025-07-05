const regBtn = document.getElementById('register');
const logBtn = document.getElementById('login');
const container = document.querySelector('.container');

// التبديل بين النماذج
regBtn.addEventListener('click', () => container.classList.add('active'));
logBtn.addEventListener('click', () => container.classList.remove('active'));

// إظهار/إخفاء كلمة المرور
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const input = icon.previousElementSibling;
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});

// منع المسافات
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\s/g, '');
    });
});

// حفظ البريد تلقائيًا من LocalStorage
window.addEventListener('load', () => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
        document.querySelectorAll('input[type="email"]').forEach(field => {
            field.value = savedEmail;
        });
    }
});

// دالة عرض الرسالة
function showMessage(msg, type = 'success') {
    const msgBox = document.getElementById('message-box');
    msgBox.textContent = msg;
    msgBox.className = type;
    msgBox.style.display = 'block';
    setTimeout(() => {
        msgBox.style.display = 'none';
        msgBox.textContent = '';
        msgBox.className = '';
    }, 3000);
}

// التحقق الفوري أثناء الكتابة
document.getElementById('signUpEmail').addEventListener('input', function () {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = document.getElementById('emailError');
    if (!emailPattern.test(this.value.trim())) {
        error.textContent = 'Invalid email format';
        error.classList.add('active');
    } else {
        error.textContent = '';
        error.classList.remove('active');
    }
});

document.getElementById('confirmPassword').addEventListener('input', function () {
    const password = document.querySelector('.sign-up-container input[type="password"]').value.trim();
    const confirm = this.value.trim();
    const msg = document.getElementById('passwordMatchMsg');
    if (password !== confirm) {
        msg.textContent = "Passwords don't match";
        msg.classList.add('active');
    } else {
        msg.textContent = '';
        msg.classList.remove('active');
    }
});

// نموذج التسجيل
document.getElementById('signUpForm').addEventListener('submit', e => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [name, email, password, confirmPassword] = [...inputs].map(input => input.value.trim());

    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('Invalid email format', 'error');
        return;
    }

    if (password.length < 8) {
        showMessage('Password must be at least 8 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }

    // حفظ البريد
    localStorage.setItem("userEmail", email);

    showMessage('Sign Up successful!', 'success');
});

// نموذج تسجيل الدخول
document.getElementById('signInForm').addEventListener('submit', e => {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const [email, password] = [...inputs].map(input => input.value.trim());

    if (!email || !password) {
        showMessage('Please enter email and password', 'error');
        return;
    }

    // حفظ البريد
    localStorage.setItem("userEmail", email);

    showMessage('Signed In successfully!', 'success');
});