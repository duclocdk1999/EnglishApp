# SET UP PROJECT

### command to check if mongodb server is running:
    sudo systemctl status mongodb

### if server has not started yet, run mongodb server manually:
    sudo systemctl start mongodb

### open folder that contains project code, download packages to run server:
    npm install

### running server
    node server.js






# POSTMAN - API

### Đăng ký account: http://localhost:3000/register, method=POST
{\
    "username": "lhdat",\
    "email": "lddat@apcs.vn",\
    "password": "1",\
    "type": "student-account",\
    "phone": "0905259939",\
    "gender": true,\
    "address": "VN",\
    "birthDate": "17/02/2000"\
}

### Đăng nhập account: http://localhost:3000/login, method=POST
{\
    "username": "oppa",\
    "password": "1"\
}

### Cập nhật thông tin account: http://localhost:3000/update, method=PUT
{\
    "username": "oppa",\
    "email": "duclocdk1999@gmail.com",\
    "password": "1",\
    "type": "student-account",\
    "phone": "0905228878",\
    "gender": false,\
    "address": "135B District 1, California, US",\
    "birthDate": "17/02/1999"\
}


### Cập nhật password cho account: http://localhost:3000/edit-password, method=PUT
{\
    "username": "oppa",\
    "password": "1",\
    "newPassword": "100"\
}
