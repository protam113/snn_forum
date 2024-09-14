import React from "react";
import Accordion from "./Accordion";
import { useTheme } from "../../../../context/themeContext";

const Service = () => {
  const { theme } = useTheme();

  return (
    <div className="p-4 rounded-lg ">
      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Điều khoản dịch vụ
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Giới thiệu
            </h3>
            <p className="text-14 leading-relaxed">
              Chào mừng bạn đến với <strong>H2H Tech Energy</strong>, diễn đàn
              trực tuyến dành riêng cho các chủ đề công nghệ, IT, IoT, lò hơi,
              điện, và năng lượng mặt trời. Diễn đàn của chúng tôi là một nền
              tảng mở để mọi người có chung đam mê và chí hướng về công nghệ có
              thể kết nối, chia sẻ kiến thức và tìm kiếm giải pháp cho các vấn
              đề kỹ thuật.
            </p>
            <p className="text-14 leading-relaxed">
              <strong>H2H Tech Energy</strong> được tạo ra với mục đích trở
              thành một nơi giao lưu và học hỏi, nơi mà các thành viên có thể tự
              do đặt câu hỏi, chia sẻ kinh nghiệm, và cập nhật những xu hướng
              công nghệ mới nhất. Chúng tôi cam kết xây dựng một cộng đồng thân
              thiện, hữu ích, và chuyên nghiệp.
            </p>
            <p className="text-14 leading-relaxed">
              Diễn đàn <strong>H2H Tech Energy</strong> thuộc sở hữu của{" "}
              <strong>SongNhatNguyen</strong> - một đơn vị hàng đầu trong việc
              cung cấp các giải pháp công nghệ và kỹ thuật. Để biết thêm thông
              tin về SongNhatNguyen, vui lòng truy cập website chính thức của
              chúng tôi tại{" "}
              <a
                href="https://songnhatnguyen.vn"
                className={`text-blue-600 underline ${
                  theme === "dark"
                    ? "hover:text-blue-400"
                    : "hover:text-blue-800"
                }`}
              >
                songnhatnguyen.vn
              </a>
              .
            </p>
            <p className="text-14 leading-relaxed">
              Chúng tôi rất vui mừng được chào đón bạn tham gia vào cộng đồng
              của chúng tôi và hy vọng bạn sẽ có những trải nghiệm tuyệt vời tại{" "}
              <strong>H2H Tech Energy</strong>.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Chấp nhận Điều khoản Dịch vụ
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <p className="text-14 leading-relaxed">
              Khi sử dụng diễn đàn H2H Tech Energy, bạn đồng ý tuân thủ và chấp
              nhận tất cả các điều khoản và điều kiện được quy định trong Điều
              khoản Dịch vụ của chúng tôi. Việc truy cập và sử dụng diễn đàn
              đồng nghĩa với việc bạn đã đọc, hiểu và chấp nhận các quy định
              này.
              <br />
              <br />
              Chúng tôi khuyến khích bạn đọc kỹ Điều khoản Dịch vụ trước khi
              tham gia diễn đàn để đảm bảo rằng bạn hiểu rõ quyền lợi và trách
              nhiệm của mình. Nếu bạn không đồng ý với bất kỳ phần nào của các
              điều khoản, vui lòng ngừng sử dụng diễn đàn ngay lập tức.
              <br />
              <br />
              Việc tuân thủ Điều khoản Dịch vụ giúp chúng tôi duy trì một cộng
              đồng trực tuyến an toàn, tích cực và thân thiện cho tất cả mọi
              người. Chúng tôi cảm ơn sự hợp tác và cam kết của bạn trong việc
              giữ cho diễn đàn trở thành một nơi học hỏi và chia sẻ hiệu quả.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Tài khoản người dùng
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Tài khoản người dùng
            </h3>
            <p className="text-14 leading-relaxed">
              Khi tạo tài khoản trên <strong>H2H Tech Energy</strong>, bạn đồng
              ý cung cấp thông tin chính xác và đầy đủ. Bạn có trách nhiệm bảo
              vệ thông tin đăng nhập của mình và không chia sẻ với bất kỳ ai.
              Nếu phát hiện bất kỳ hoạt động đáng ngờ nào, vui lòng thông báo
              cho quản trị viên ngay lập tức.
            </p>
            <p className="text-14 leading-relaxed">
              Người dùng phải đảm bảo an toàn cho tài khoản của mình và chịu
              trách nhiệm về mọi hoạt động diễn ra dưới tài khoản của họ.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Quy tắc cộng đồng
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Quy tắc cộng đồng
            </h3>
            <p className="text-14 leading-relaxed">
              Thành viên phải tôn trọng lẫn nhau, không đăng nội dung xúc phạm,
              phân biệt đối xử, hoặc vi phạm pháp luật. Không đăng nội dung
              spam, quảng cáo không phép, hoặc khiêu dâm.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Quyền và trách nhiệm của quản trị viên
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Quyền và trách nhiệm của quản trị viên
            </h3>
            <p className="text-14 leading-relaxed">
              Quản trị viên có quyền xóa bài viết, cấm tài khoản, hoặc thực hiện
              các biện pháp cần thiết để duy trì trật tự trên diễn đàn. Quản trị
              viên có trách nhiệm duy trì và bảo vệ diễn đàn.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Sở hữu trí tuệ
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Sở hữu trí tuệ
            </h3>
            <p className="text-14 leading-relaxed">
              Mọi nội dung do người dùng đăng tải trên{" "}
              <strong>H2H Tech Energy</strong>
              phải tuân thủ các quy định về bản quyền và quyền sở hữu trí tuệ.
              Bằng việc đăng tải nội dung, người dùng cấp cho diễn đàn quyền sử
              dụng nội dung đó.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Bảo mật và quyền riêng tư
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Bảo mật và quyền riêng tư
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng theo
              quy định của pháp luật. Chính sách bảo mật chi tiết có thể được
              xem tại trang chính sách bảo mật của chúng tôi.
            </p>
          </div>
        }
      />

      <Accordion
        title={
          <span
            className={`text-18 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Thay đổi Điều khoản Dịch vụ
          </span>
        }
        answer={
          <div
            className={`space-y-4 p-4 ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-red-400" : "text-custom-red"
              }`}
            >
              Thay đổi Điều khoản Dịch vụ
            </h3>
            <p className="text-14 leading-relaxed">
              Chúng tôi có thể cập nhật Điều khoản Dịch vụ này theo thời gian.
              Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên diễn đàn.
              Người dùng có trách nhiệm kiểm tra thường xuyên để nắm bắt các
              thay đổi.
            </p>
          </div>
        }
      />
    </div>
  );
};

export default Service;
