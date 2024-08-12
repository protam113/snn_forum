import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <Accordion
        title={<span className="text-16">Công Nghệ Chúng Tôi Sử Dụng!</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Front-end: React.js
            </h3>
            <ul className="text-14">
              <li>
                <strong>Nhanh và Hiệu Quả:</strong> React.js giúp trang web của
                chúng tôi tải nhanh và hoạt động mượt mà. Nó sử dụng một kỹ
                thuật đặc biệt gọi là Virtual DOM để cập nhật giao diện một cách
                hiệu quả, giúp bạn không phải chờ lâu để thấy sự thay đổi.
              </li>
              <li>
                <strong>Các Thành Phần Có Thể Tái Sử Dụng:</strong> React cho
                phép tạo các thành phần tái sử dụng, giảm thiểu sự trùng lặp mã
                và tăng khả năng bảo trì.
              </li>
              <li>
                <strong>Cộng Đồng Hỗ Trợ Mạnh Mẽ:</strong> Chúng tôi xây dựng
                các phần của trang web dưới dạng các khối riêng biệt, có thể sử
                dụng lại ở các nơi khác nhau. Điều này giúp dễ dàng cập nhật và
                bảo trì trang mà không phải viết lại mã.
              </li>
              <li>
                <strong>Cộng Đồng Hỗ Trợ Rộng Lớn:</strong> Có một nhóm các nhà
                phát triển lớn sử dụng React, vì vậy chúng tôi có quyền truy cập
                vào nhiều tài nguyên, hỗ trợ và công cụ để nâng cao trang web
                của chúng tôi.
              </li>
              <li>
                <strong>Hoạt Động Trên Tất Cả Các Thiết Bị:</strong> React đảm
                bảo rằng trang web của chúng tôi hoạt động nhất quán trên nhiều
                thiết bị và trình duyệt khác nhau, giúp bạn có trải nghiệm tốt
                dù bạn đang sử dụng điện thoại, máy tính bảng hay máy tính.
              </li>
            </ul>
            <h3 className="text-16 font-bold text-custom-red">
              Back-end: Django
            </h3>
            <ul className="text-14">
              <li>
                <strong>Quản Lý Tăng Trưởng Tốt:</strong> Django rất phù hợp cho
                các trang web cần phát triển hoặc xử lý nhiều người dùng và dữ
                liệu. Nó hỗ trợ các tính năng phức tạp trong khi giữ cho mọi thứ
                được tổ chức.
              </li>
              <li>
                <strong>Bảo Mật Xây Dựng Sẵn:</strong> Django bao gồm nhiều tính
                năng bảo mật tích hợp để giữ cho trang web của chúng tôi an toàn
                trước các mối đe dọa phổ biến như hack và rò rỉ dữ liệu.
              </li>
              <li>
                <strong>Quản Lý Dữ Liệu Dễ Dàng:</strong> Nó đi kèm với một giao
                diện quản trị dễ sử dụng để quản lý dữ liệu của trang web, giúp
                cập nhật và duy trì nội dung một cách đơn giản.
              </li>
              <li>
                <strong>Phát Triển Nhanh:</strong> Django cho phép chúng tôi xây
                dựng và triển khai các tính năng mới nhanh chóng, giúp chúng tôi
                cung cấp các cải tiến và cập nhật đến bạn nhanh hơn.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <span className="text-16">
            Thiết Kế: Tailwind CSS và CSS Tùy Chỉnh
          </span>
        }
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">Tailwind CSS</h3>
            <p>
              Chúng tôi sử dụng Tailwind CSS để tạo ra thiết kế hiện đại, sạch
              sẽ và đáp ứng. Tailwind cung cấp một bộ các lớp tiện ích giúp xây
              dựng thiết kế đẹp và đồng nhất mà không cần viết CSS tùy chỉnh cho
              từng phần tử.
            </p>
            <ul className="text-14">
              <li>
                <strong>Bố Cục Đáp Ứng:</strong> Tailwind giúp chúng tôi đảm bảo
                rằng trang web của chúng tôi trông tuyệt vời trên tất cả các
                kích cỡ màn hình, từ màn hình máy tính để bàn lớn đến điện thoại
                di động nhỏ.
              </li>
              <li>
                <strong>Thiết Kế Tùy Chỉnh:</strong> Chúng tôi có thể nhanh
                chóng điều chỉnh các yếu tố thiết kế như màu sắc, khoảng cách và
                kiểu chữ để phù hợp với phong cách thương hiệu của chúng tôi và
                đảm bảo một vẻ ngoài độc đáo.
              </li>
            </ul>
            <h3>CSS Tùy Chỉnh</h3>
            <p>
              Ngoài Tailwind CSS, chúng tôi cũng sử dụng một chút CSS tùy chỉnh
              để xử lý các nhu cầu thiết kế cụ thể mà Tailwind có thể không bao
              phủ.
            </p>
            <ul>
              <li>
                <strong>Phong Cách Tinh Chỉnh:</strong> CSS tùy chỉnh cho phép
                chúng tôi áp dụng các phong cách chi tiết cho các phần tử đặc
                biệt hoặc tạo ra các hiệu ứng và chuyển tiếp giúp nâng cao trải
                nghiệm người dùng.
              </li>
              <li>
                <strong>Đồng Nhất và Linh Hoạt:</strong> Trong khi Tailwind xử
                lý phần lớn phong cách của chúng tôi, CSS tùy chỉnh đảm bảo rằng
                chúng tôi có thể đạt được các hiệu ứng hình ảnh chính xác và duy
                trì tính đồng nhất trên toàn trang.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={<span className="text-16">Lấy Dữ Liệu: SWR với MySQL</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Lấy Dữ Liệu Hiệu Quả
            </h3>
            <p>
              Chúng tôi sử dụng SWR (Stale-While-Revalidate) để lấy dữ liệu và
              lưu cache một cách hiệu quả trong ứng dụng React của chúng tôi.
              SWR giúp chúng tôi lấy, lưu cache và xác thực lại dữ liệu một cách
              liền mạch, đảm bảo rằng dữ liệu hiển thị luôn được cập nhật.
            </p>
            <ul className="text-14">
              <li>
                <strong>Xác Thực Lại Tự Động:</strong> SWR tự động xác thực lại
                dữ liệu trong nền, giữ cho thông tin luôn mới và đảm bảo rằng
                người dùng thấy dữ liệu mới nhất mà không cần phải làm mới thủ
                công.
              </li>
              <li>
                <strong>Cập Nhật Giao Diện Lạc Quan:</strong> SWR hỗ trợ cập
                nhật giao diện lạc quan, cung cấp trải nghiệm người dùng nhanh
                hơn và phản hồi hơn bằng cách cập nhật giao diện ngay lập tức
                trong khi lấy dữ liệu mới ở nền.
              </li>
            </ul>
            <h3>Hợp Tác Với MySQL</h3>
            <p>
              Ở phía backend, chúng tôi sử dụng MySQL làm cơ sở dữ liệu để lưu
              trữ và quản lý dữ liệu một cách hiệu quả.
            </p>
            <ul className="text-14">
              <li>
                <strong>Lưu Trữ Dữ Liệu Đáng Tin Cậy:</strong> MySQL là một hệ
                thống quản lý cơ sở dữ liệu mạnh mẽ và đáng tin cậy, đảm bảo
                tính toàn vẹn dữ liệu và hỗ trợ các truy vấn phức tạp.
              </li>
              <li>
                <strong>Mở Rộng:</strong> MySQL có thể xử lý khối lượng dữ liệu
                lớn và phù hợp với các ứng dụng cần mở rộng để đáp ứng nhu cầu
                của người dùng đang phát triển.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={<span className="text-16">Xác Thực (Auth)</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Sử Dụng Access Token và Refresh Token
            </h3>
            <p>
              Chúng tôi sử dụng access token và refresh token để đảm bảo xác
              thực người dùng an toàn và bảo vệ. Cách tiếp cận này giúp quản lý
              phiên người dùng hiệu quả và an toàn.
            </p>
            <h3 className="text-16 font-bold text-custom-red">Quản Lý Phiên</h3>
            <ul className="text-14">
              <li>
                <strong>Đăng Nhập Duy Trì:</strong> Người dùng có thể đăng nhập
                và duy trì phiên của mình thông qua các token, giúp trải nghiệm
                người dùng mượt mà và liên tục.
              </li>
              <li>
                <strong>Tạo và Quản Lý Tài Khoản:</strong> Cung cấp chức năng
                cho người dùng để đăng ký và quản lý tài khoản cá nhân của mình
                một cách an toàn.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={<span className="text-16">Chức Năng Trang Web</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Xem và Tương Tác Với Dữ Liệu
            </h3>
            <ul className="text-14">
              <li>
                <strong>Xem Thông Tin:</strong> Người dùng có thể xem các thông
                tin quan trọng hoặc nội dung trên trang web dễ dàng.
              </li>
              <li>
                <strong>Gửi Thông Tin:</strong> Các tính năng như gửi phản hồi
                hoặc yêu cầu liên hệ được hỗ trợ để người dùng có thể tương tác
                với chúng tôi nhanh chóng.
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default FAQ;
