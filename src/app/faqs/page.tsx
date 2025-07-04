"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question:
        "Các đối tượng có mức độ hoạt động thể lực khác điều chỉnh thực đơn như thế nào?",
      answer: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Phụ nữ mang thai và bà mẹ cho con bú có mức độ hoạt động thể lực
            khác (chủ yếu là mức hoạt động thể lực nhẹ như nhân viên văn phòng,
            nhân viên bán hàng...) có thể điều chỉnh thực đơn bằng cách điều
            chỉnh lượng thực phẩm ăn vào theo hướng dẫn như sau:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>
              Bước 1: Xác định nhu cầu năng lượng của bạn mỗi ngày theo hướng
              dẫn tại &ldquo;Ngân hàng thực đơn cân bằng dinh dưỡng dùng cho phụ
              nữ mang thai và bà mẹ cho con bú&rdquo;.
            </li>
            <li>
              Bước 2: Lấy nhu cầu năng lượng ăn vào vừa xác định được ở bước 1
              chia cho nhu cầu năng lượng khuyến nghị của bạn ở bảng 1 Bảng nhu
              cầu dinh dưỡng khuyến nghị cho người Việt Nam.
            </li>
            <li>
              Bước 3: Hiệu chỉnh lượng thực phẩm cần ăn theo hệ số 3.4 Đạt được
              số với ngân hàng thực đơn cân bằng dinh dưỡng.
            </li>
          </ul>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="https://storage.googleapis.com/a1aa/image/PiDdfBQO-rG8z3LGc1lpTOJ2GR9P3Uv9ABIC_ru4eEI.jpg"
              alt="A pregnant woman holding an apple"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-gray-700">
            Ví dụ, nếu bạn là phụ nữ mang thai có độ tuổi trong khoảng 20 - 29
            tuổi, ở giai đoạn 3 tháng đầu thai kỳ, bạn áp dụng theo các bước như
            hướng dẫn thì có thông tin như sau:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Nhu cầu khuyến nghị năng lượng của bạn là 1.810 Kcal</li>
            <li>
              Hệ số A của bạn là 1.810/((1.978+2.082)/2) (0.9 (Của bảng 9/10)
            </li>
          </ul>
          <p className="text-gray-700">
            Lượng thực phẩm bạn cần ăn = 9/10 so với lượng thực phẩm của Ngân
            hàng thực đơn cân bằng dinh dưỡng.
          </p>
        </div>
      ),
    },
    {
      question:
        "Nhu cầu năng lượng dành cho phụ nữ mang thai, bà mẹ cho con bú mức hoạt động thể lực nhẹ là như thế nào?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Thực đơn đã được phát triển theo tiêu chuẩn như thế nào?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question:
        "Thực đơn dành cho phụ nữ mang thai đơn hay thai đôi? Nếu chỉ dành cho thai đơn thì những người mang thai đôi có tham khảo được không?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question:
        "Nếu bà mẹ chỉ có thể ăn một hoặc vài bữa trong thực đơn, không thể ăn đầy đủ tất cả các bữa trong 1 ngày của thực đơn thì có được không",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question:
        "Nếu bà mẹ không ăn được một số thực phẩm/món ăn trong thực đơn thì phải làm sao?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question:
        "Làm thế nào để đảm bảo chế độ ăn đủ chất cho thai nhi trong 3 tháng đầu?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Các dấu hiệu nhận biết thiếu dinh dưỡng trong thai kỳ là gì?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Những thực phẩm nào cần tránh trong thời kỳ mang thai?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Cách bổ sung sắt và acid folic hiệu quả trong thai kỳ?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Chế độ ăn cho bà mẹ bị đái tháo đường thai kỳ cần lưu ý gì?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Chế độ ăn cho bà mẹ bị nghén nặng cần điều chỉnh như thế nào?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
    {
      question: "Làm sao để duy trì cân nặng hợp lý trong thai kỳ?",
      answer: (
        <p className="text-gray-700">
          Nội dung câu trả lời sẽ được thêm vào đây
        </p>
      ),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto py-6 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Những Câu Hỏi Thường Gặp
          </h1>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 px-4 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-red-400 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
