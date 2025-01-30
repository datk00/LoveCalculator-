import React, { useState } from 'react';
import styles from './loveCalculator.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const LoveCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');
  const [encouragingMessage, setEncouragingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const loadingMessages = ["Lọc chữ..", "Gộp chữ số...", "Việt Name vô địch...", "Vì tinh tú...", "Anh Chây chín bảy...", "Cách ngủ 8 tiếng trong 1 giờ...", "Hội suy thận...", "Ni Ni Ni Ni gaaa... ", "Đã hoàn tất"];

  // Hàm loại bỏ dấu
  const removeAccents = (str) => {
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
    // Chuyển các ký tự đặc biệt như "đ" thành "d"
    return normalizedStr.replace(/[đ]/g, "d");
  };

  const simulateLoading = (callback) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < loadingMessages.length) {
        setLoadingText(loadingMessages[i]);
        i++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, 500);
  };

  // Hàm tính toán và lấy thông điệp khích lệ
  const getEncouragingMessage = (percentage) => {
    if (percentage <= 20) {
      return "Có lẽ hai bạn chưa thực sự hòa hợp lắm, nhưng đừng buồn! Hãy thử lại với những cái tên khác, biết đâu may mắn sẽ mỉm cười!";
    } else if (percentage <= 40) {
      return "Dù hai bạn có thể có một chút tương đồng, nhưng vẫn còn khá nhiều điều cần phải thay đổi để trở thành một cặp đôi lý tưởng. Hãy thử trò chuyện và khám phá thêm về nhau nhé!";
    } else if (percentage <= 60) {
      return "Bạn và đối phương đang ở một mức khá ổn! Tuy nhiên, vẫn còn cơ hội để tìm hiểu thêm về nhau và nâng cao sự kết nối. Hãy thử thêm những điều mới mẻ để khiến tỷ lệ này cao hơn nữa!";
    } else if (percentage <= 80) {
      return "Wow, hai bạn thật sự rất hợp nhau! Cả hai có nhiều điểm chung, và bạn có thể cùng nhau xây dựng một mối quan hệ tuyệt vời. Hãy tiếp tục khám phá những điều đặc biệt mà hai bạn mang lại cho nhau!";
    } else {
      return "Chúc mừng bạn và người ấy, hai bạn là một cặp đôi hoàn hảo! Tỷ lệ phần trăm này cho thấy rằng hai bạn thực sự rất hòa hợp. Hãy trân trọng những khoảnh khắc tuyệt vời bên nhau và tạo dựng một tương lai đầy hạnh phúc nhé!";
    }
  };

  const calculateLove = () => {
    if (!name1 || !name2) {
      alert("Vui lòng nhập cả hai tên!");
      return;
    }

    setIsLoading(true);
    setResult('');
    setEncouragingMessage('');

    simulateLoading(() => {
      // Loại bỏ dấu và chuyển về chữ thường
      let lowerStr1 = name1.toLowerCase()
      let lowerStr2 = name2.toLowerCase()

      const normalizedName1 = removeAccents(lowerStr1)
      const normalizedName2 = removeAccents(lowerStr2)
      

      const combinedNames = normalizedName1 + normalizedName2;

      let letterCounts = {};

      // Đếm số lần xuất hiện của mỗi chữ cái
      for (let char of combinedNames) {
        if (/[a-z]/.test(char)) {
          letterCounts[char] = (letterCounts[char] || 0) + 1;
        }
      }
      

      // Tạo chuỗi số từ số lần xuất hiện
      let numberString = '';
      for (let char in letterCounts) {
        numberString += letterCounts[char];
      }
      console.log(numberString);
      
      // Tính toán tỉ lệ phần trăm
      while (numberString.length > 2) {
        let newNumberString = '';
        let length = numberString.length;
        for (let i = 0; i < Math.floor(length / 2); i++) {
          newNumberString += (
            parseInt(numberString[i]) + parseInt(numberString[length - 1 - i])
          ).toString();
        }
        if (length % 2 !== 0) {
          newNumberString += numberString[Math.floor(length / 2)];
        }
        numberString = newNumberString;
      }

      const percentage = parseInt(numberString);
      setIsLoading(false);
      setResult(percentage + '%');
      setEncouragingMessage(getEncouragingMessage(percentage));
    });
  };

  return (
    <div className={cx("love-calculator")}>
      <h1>Love Calculator 💖</h1>
      <div className={cx("input-container")}>
        <input
          type="text"
          placeholder="Nhập họ và tên của bạn"
          value={name1}
          onChange={(e) => 
            {
                setName1(e.target.value)
                setResult('')
            }}
        />
        <input
          type="text"
          placeholder="Nhập họ và tên của người ấy"
          value={name2}
          onChange={(e) => {
            setName2(e.target.value)
            setResult('')
          }}
        />
      </div>
      <button onClick={calculateLove} disabled={isLoading}>
        {isLoading ? 'Đang tính toán...' : 'Tính toán'}
      </button>

      {isLoading && (
        <div className={cx("loading-container")}>
          <div className={cx("loading-spinner")}></div>
          <p>{loadingText}</p>
        </div>
      )}

      {result && !isLoading && (
        <div className={cx("result-container")}>
          <h2>Kết quả: {result}</h2>
          <p>{encouragingMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LoveCalculator;
