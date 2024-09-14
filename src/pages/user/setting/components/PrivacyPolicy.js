import React from "react";
import Accordion from "./Accordion";

const PrivacyPolicy = () => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <Accordion
        title={
          <span className="text-16 font-semibold">Chính sách riêng tư</span>
        }
        answer={
          <div className="space-y-4 p-4">
            <h3 className="text-18 font-bold text-custom-red">Giới thiệu</h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi tại <strong>H2H Tech Energy</strong> cam kết bảo vệ
              quyền riêng tư của bạn. Chính sách này giải thích cách chúng tôi
              thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Thông tin chúng tôi thu thập
            </h3>
            <p className="text-14 leading-relaxed">
              Khi bạn đăng ký tài khoản, chúng tôi thu thập thông tin cá nhân
              như tên, email và số điện thoại. Ngoài ra, chúng tôi cũng thu thập
              thông tin phi cá nhân như địa chỉ IP và cookie để cải thiện trải
              nghiệm người dùng.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Cách chúng tôi sử dụng thông tin
            </h3>
            <p className="text-14 leading-relaxed">
              Thông tin của bạn được sử dụng để tạo và quản lý tài khoản, cung
              cấp dịch vụ, và gửi thông báo. Chúng tôi cũng sử dụng thông tin để
              phân tích hành vi người dùng và cải thiện diễn đàn.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Chia sẻ thông tin
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba,
              ngoại trừ các đối tác cung cấp dịch vụ và tuân thủ pháp luật khi
              cần thiết.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Bảo mật thông tin
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức để bảo
              vệ thông tin cá nhân của bạn khỏi truy cập trái phép. Chỉ những
              nhân viên được ủy quyền mới có quyền truy cập thông tin này.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Quyền của người dùng
            </h3>
            <p className="text-14 leading-relaxed">
              Bạn có quyền truy cập, cập nhật hoặc yêu cầu xóa thông tin cá nhân
              của mình. Nếu bạn muốn từ chối nhận thông báo tiếp thị, bạn có thể
              thay đổi cài đặt thông báo trong tài khoản của mình.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Cookie và công nghệ theo dõi
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn
              có thể quản lý cài đặt cookie trong trình duyệt của mình.
            </p>

            <h3 className="text-18 font-bold text-custom-red">
              Thay đổi chính sách
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi có quyền thay đổi chính sách riêng tư bất kỳ lúc nào.
              Khi có thay đổi, chúng tôi sẽ thông báo cho bạn qua email hoặc
              thông qua diễn đàn.
            </p>

            <h3 className="text-18 font-bold text-custom-red">Liên hệ</h3>
            <p className="text-14 leading-relaxed">
              Nếu bạn có bất kỳ câu hỏi nào về chính sách riêng tư của chúng
              tôi, vui lòng liên hệ với chúng tôi qua email tại{" "}
              <a
                href="mailto:xlr.devteam03@gmail.com"
                className="text-blue-600 underline"
              >
                xlr.devteam03@gmail.com
              </a>
              .
            </p>
          </div>
        }
      />
    </div>
  );
};

export default PrivacyPolicy;
