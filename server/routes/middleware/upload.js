const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'images/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, callback) {
        callback(null, new Date().valueOf() + file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
    },
});
const upload = multer({ storage: storage });

module.exports = upload;