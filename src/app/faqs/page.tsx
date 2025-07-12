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
        <div className="space-y-2 text-gray-700">
          <p>
            Nhu cầu năng lượng của phụ nữ mang thai và bà mẹ cho con bú phụ thuộc vào tuổi, cân nặng, chiều cao, mức độ hoạt động thể lực và giai đoạn thai kỳ hoặc cho con bú. Đối với mức hoạt động thể lực nhẹ, nhu cầu năng lượng thường thấp hơn so với người hoạt động trung bình hoặc nặng.
          </p>
          <ul className="list-disc ml-5">
            <li>Phụ nữ mang thai 3 tháng đầu: tăng thêm khoảng 100 kcal/ngày so với bình thường.</li>
            <li>Phụ nữ mang thai 3 tháng giữa và cuối: tăng thêm khoảng 250-350 kcal/ngày.</li>
            <li>Bà mẹ cho con bú: tăng thêm khoảng 500 kcal/ngày trong 6 tháng đầu, 400 kcal/ngày trong 6 tháng tiếp theo.</li>
          </ul>
          <p>
            Cần tham khảo bảng nhu cầu dinh dưỡng khuyến nghị cho người Việt Nam để điều chỉnh phù hợp với từng cá nhân.
          </p>
        </div>
      ),
    },
    {
      question: "Thực đơn đã được phát triển theo tiêu chuẩn như thế nào?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <p>
            Thực đơn được xây dựng dựa trên các tiêu chuẩn dinh dưỡng quốc gia và quốc tế, đảm bảo cân bằng các nhóm chất: đạm, béo, đường bột, vitamin và khoáng chất. Các tiêu chuẩn tham khảo bao gồm:
          </p>
          <ul className="list-disc ml-5">
            <li>Bảng nhu cầu dinh dưỡng khuyến nghị cho người Việt Nam (RNI).</li>
            <li>Khuyến nghị của Tổ chức Y tế Thế giới (WHO) và Quỹ Nhi đồng Liên Hợp Quốc (UNICEF).</li>
            <li>Thực đơn được kiểm nghiệm bởi các chuyên gia dinh dưỡng và bác sĩ sản khoa.</li>
          </ul>
        </div>
      ),
    },
    {
      question:
        "Thực đơn dành cho phụ nữ mang thai đơn hay thai đôi? Nếu chỉ dành cho thai đơn thì những người mang thai đôi có tham khảo được không?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <p>
            Thực đơn chủ yếu được thiết kế cho phụ nữ mang thai đơn. Tuy nhiên, phụ nữ mang thai đôi hoặc đa thai có thể tham khảo và cần tăng thêm lượng thực phẩm, đặc biệt là năng lượng, đạm, canxi, sắt và các vi chất khác theo hướng dẫn của bác sĩ chuyên khoa.
          </p>
          <p>
            Đối với thai đôi, nhu cầu năng lượng có thể tăng thêm 300-500 kcal/ngày so với thai đơn. Nên tham khảo ý kiến bác sĩ để điều chỉnh phù hợp.
          </p>
        </div>
      ),
    },
    {
      question:
        "Nếu bà mẹ chỉ có thể ăn một hoặc vài bữa trong thực đơn, không thể ăn đầy đủ tất cả các bữa trong 1 ngày của thực đơn thì có được không",
      answer: (
        <div className="space-y-2 text-gray-700">
          <p>
            Có thể linh hoạt lựa chọn các bữa ăn phù hợp với điều kiện và sở thích cá nhân. Tuy nhiên, nên đảm bảo tổng lượng thực phẩm và năng lượng trong ngày đáp ứng nhu cầu dinh dưỡng. Nếu bỏ bữa, cần bổ sung vào các bữa còn lại để tránh thiếu hụt.
          </p>
        </div>
      ),
    },
    {
      question:
        "Nếu bà mẹ không ăn được một số thực phẩm/món ăn trong thực đơn thì phải làm sao?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <p>
            Nếu không ăn được một số thực phẩm, có thể thay thế bằng thực phẩm cùng nhóm dinh dưỡng. Ví dụ: không ăn được thịt bò có thể thay bằng cá, trứng, đậu phụ... Đảm bảo tổng lượng đạm, vitamin và khoáng chất không bị thiếu hụt.
          </p>
          <p>
            Nếu dị ứng hoặc có bệnh lý đặc biệt, nên tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng.
          </p>
        </div>
      ),
    },
    {
      question:
        "Làm thế nào để đảm bảo chế độ ăn đủ chất cho thai nhi trong 3 tháng đầu?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <p>
            3 tháng đầu thai kỳ là giai đoạn quan trọng cho sự phát triển của thai nhi. Mẹ bầu nên:
          </p>
          <ul className="list-disc ml-5">
            <li>Bổ sung acid folic, sắt, canxi, vitamin D theo hướng dẫn.</li>
            <li>Ăn đa dạng các loại thực phẩm: rau xanh, trái cây, ngũ cốc nguyên hạt, thịt nạc, cá, trứng, sữa.</li>
            <li>Tránh thực phẩm sống, chưa tiệt trùng, thực phẩm nhiều đường, chất béo bão hòa.</li>
            <li>Uống đủ nước, hạn chế đồ uống có ga, caffein.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Các dấu hiệu nhận biết thiếu dinh dưỡng trong thai kỳ là gì?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Tăng cân chậm hoặc không tăng cân.</li>
            <li>Da xanh xao, tóc rụng nhiều.</li>
            <li>Thường xuyên mệt mỏi, chóng mặt, hoa mắt.</li>
            <li>Thiếu máu, xét nghiệm máu cho thấy thiếu sắt, acid folic.</li>
            <li>Thai nhi phát triển chậm, chỉ số siêu âm thấp hơn bình thường.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Những thực phẩm nào cần tránh trong thời kỳ mang thai?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Thực phẩm sống hoặc chưa nấu chín kỹ (gỏi cá, trứng sống...)</li>
            <li>Thịt nguội, xúc xích, pate chưa tiệt trùng.</li>
            <li>Phô mai mềm từ sữa chưa tiệt trùng.</li>
            <li>Rượu, bia, đồ uống có cồn.</li>
            <li>Đồ uống chứa nhiều caffein (cà phê, nước tăng lực...)</li>
            <li>Thực phẩm nhiều đường, chất béo bão hòa.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Cách bổ sung sắt và acid folic hiệu quả trong thai kỳ?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Bổ sung viên sắt và acid folic theo chỉ định của bác sĩ.</li>
            <li>Ăn thực phẩm giàu sắt: thịt đỏ, gan, rau xanh đậm, đậu đỗ.</li>
            <li>Kết hợp thực phẩm giàu vitamin C để tăng hấp thu sắt.</li>
            <li>Tránh uống trà, cà phê gần bữa ăn chứa sắt.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Chế độ ăn cho bà mẹ bị đái tháo đường thai kỳ cần lưu ý gì?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Chia nhỏ bữa ăn, tránh ăn nhiều tinh bột trong một bữa.</li>
            <li>Ưu tiên ngũ cốc nguyên hạt, rau xanh, trái cây ít ngọt.</li>
            <li>Hạn chế đường, bánh kẹo, nước ngọt.</li>
            <li>Kiểm tra đường huyết thường xuyên và tuân thủ hướng dẫn của bác sĩ.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Chế độ ăn cho bà mẹ bị nghén nặng cần điều chỉnh như thế nào?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Chia nhỏ bữa ăn, ăn từng ít một.</li>
            <li>Chọn thực phẩm dễ tiêu, ít mùi, tránh thức ăn nhiều dầu mỡ.</li>
            <li>Uống đủ nước, có thể dùng nước gừng hoặc trà gừng.</li>
            <li>Nghỉ ngơi hợp lý, tránh căng thẳng.</li>
            <li>Nếu nghén nặng kéo dài, nên đi khám bác sĩ.</li>
          </ul>
        </div>
      ),
    },
    {
      question: "Làm sao để duy trì cân nặng hợp lý trong thai kỳ?",
      answer: (
        <div className="space-y-2 text-gray-700">
          <ul className="list-disc ml-5">
            <li>Ăn đủ các nhóm chất, không bỏ bữa.</li>
            <li>Kiểm soát lượng tinh bột, đường, chất béo.</li>
            <li>Tăng cường rau xanh, trái cây tươi.</li>
            <li>Vận động nhẹ nhàng như đi bộ, yoga cho bà bầu.</li>
            <li>Theo dõi cân nặng định kỳ và tham khảo ý kiến bác sĩ.</li>
          </ul>
        </div>
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
