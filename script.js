function calculateBitrate() {
    const bitrateOrigin = parseFloat(document.getElementById('bitrateOrigin').value.trim());
    const mbOrigin = parseFloat(document.getElementById('mbOrigin').value.trim());
    const mbDesired = parseFloat(document.getElementById('mbDesired').value.trim());
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    // Kiểm tra dữ liệu hợp lệ
    if (isNaN(bitrateOrigin) || isNaN(mbOrigin) || isNaN(mbDesired)) {
        result.innerHTML = 'Vui lòng nhập đầy đủ và đúng định dạng số!';
        copyButton.style.display = 'none';
        return;
    }

    if (bitrateOrigin <= 0 || mbOrigin <= 0 || mbDesired <= 0) {
        result.innerHTML = 'Giá trị phải lớn hơn 0!';
        copyButton.style.display = 'none';
        return;
    }

    try {
        // Tính bitrate mong muốn
        const bitrateDesired = (mbDesired * bitrateOrigin) / (mbOrigin * 1.09);
        const roundedBitrate = Math.round(bitrateDesired);
        const resultText = `Bitrate video mong muốn: ${roundedBitrate} kbps`;

        result.innerHTML = resultText;
        copyButton.style.display = 'inline-block';
        copyButton.setAttribute('data-result', roundedBitrate); // Chỉ lưu số
    } catch (error) {
        result.innerHTML = 'Có lỗi khi tính toán, vui lòng thử lại';
        copyButton.style.display = 'none';
    }
}

function copyResult() {
    const copyButton = document.getElementById('copyButton');
    const resultText = copyButton.getAttribute('data-result');
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Đã copy kết quả!');
    }).catch(error => {
        console.log('Lỗi copy:', error);
    });
}

function clearInput() {
    const bitrateOrigin = document.getElementById('bitrateOrigin');
    const mbOrigin = document.getElementById('mbOrigin');
    const mbDesired = document.getElementById('mbDesired');
    const result = document.getElementById('result');
    const copyButton = document.getElementById('copyButton');

    bitrateOrigin.value = '';
    mbOrigin.value = '';
    mbDesired.value = '';
    result.innerHTML = '';
    copyButton.style.display = 'none';
}

const music = document.getElementById('backgroundMusic');
const speakerIcon = document.getElementById('speakerIcon');
let isPlaying = false;
let isMuted = false;

function toggleMusic() {
    if (!isPlaying && !isMuted) {
        music.play().then(() => {
            isPlaying = true;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

function toggleSpeaker() {
    if (isPlaying) {
        music.pause();
        isPlaying = false;
        isMuted = true;
        speakerIcon.textContent = '🔇';
    } else {
        music.play().then(() => {
            isPlaying = true;
            isMuted = false;
            speakerIcon.textContent = '🔊';
        }).catch(error => {
            console.log('Lỗi phát nhạc:', error);
        });
    }
}

document.addEventListener('mousemove', toggleMusic);
document.addEventListener('touchstart', toggleMusic);
document.addEventListener('touchend', toggleMusic);
document.addEventListener('click', (e) => {
    if (!e.target.closest('.speaker-button')) {
        toggleMusic();
    }
});

// Kiểm tra ảnh nền
window.addEventListener('load', () => {
    const bgImage = new Image();
    bgImage.src = 'https://cdn.jsdelivr.net/gh/tongtrankien1605/tongtrankien1605@main/global/image/city-night.jpg';
    bgImage.onload = () => console.log('Ảnh nền tải thành công');
    bgImage.onerror = () => console.log('Lỗi tải ảnh nền, kiểm tra link');
});