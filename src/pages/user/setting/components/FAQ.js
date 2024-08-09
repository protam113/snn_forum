import React from "react";
import Accordion from "./Accordion";

const FAQ = () => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg">
      <Accordion
        title={<span className="text-20">The Technology We Use!</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Front-end: React.js
            </h3>
            <ul className="text-14">
              <li>
                <strong>Fast and Efficient:</strong> React.js helps our website
                load quickly and run smoothly. It uses a special technique
                called Virtual DOM to update the interface efficiently, so you
                don’t have to wait long for changes to appear.
              </li>
              <li>
                <strong>Reusable Components:</strong> React allows for the
                creation of reusable components, reducing code duplication and
                enhancing maintainability.
              </li>
              <li>
                <strong>Strong Community Support:</strong> We build parts of our
                website as separate pieces, which we can use again in different
                places. This makes it easier to update and maintain the site
                without rewriting code.
              </li>
              <li>
                <strong>Strong Support Community:</strong> There’s a large group
                of developers who use React, so we have access to a wealth of
                resources, support, and tools to enhance our website.
              </li>
              <li>
                <strong>Works on All Devices:</strong> React ensures that our
                website performs consistently well on various devices and
                browsers, so you get a good experience whether you’re using a
                phone, tablet, or computer.
              </li>
            </ul>
            <h3 className="text-16 font-bold text-custom-red">
              Back-end: Django
            </h3>
            <ul className="text-14">
              <li>
                <strong>Handles Growth Well:</strong> Django is great for
                websites that need to grow or handle a lot of users and data. It
                supports complex features while keeping everything organized.
              </li>
              <li>
                <strong>Built-in Security:</strong> Django includes many
                built-in security features to keep our website safe from common
                threats like hacking and data breaches.
              </li>
              <li>
                <strong>Easy Data Management:</strong> It comes with an
                easy-to-use admin interface for managing the site’s data, making
                it simple to update and maintain content.
              </li>
              <li>
                <strong>Quick Development:</strong>Django allows us to build and
                launch new features quickly, so we can deliver improvements and
                updates to you faster.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={
          <span className="text-20">Design: Tailwind CSS and Custom CSS</span>
        }
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">Tailwind CSS</h3>
            <p>
              We use Tailwind CSS to create a modern, clean, and responsive
              design. Tailwind provides a set of utility classes that make it
              easy to build beautiful and consistent designs without writing
              custom CSS for every element.
            </p>
            <ul className="text-14">
              <li>
                <strong>Responsive Layouts:</strong> Tailwind helps us ensure
                that our website looks great on all screen sizes, from large
                desktop monitors to small mobile phones.
              </li>
              <li>
                <strong>Customizable Design:</strong> We can quickly adjust
                design elements like colors, spacing, and typography to match
                our brand’s style and ensure a unique look.
              </li>
            </ul>
            <h3>Custom CSS</h3>
            <p>
              In addition to Tailwind CSS, we use a bit of custom CSS to handle
              specific styling needs that Tailwind may not cover.
            </p>
            <ul>
              <li>
                <strong>Fine-Tuned Styles:</strong> Custom CSS allows us to
                apply detailed styling for unique elements or create animations
                and transitions that enhance user experience.
              </li>
              <li>
                <strong>Consistency and Flexibility:</strong> While Tailwind
                handles most of our styling, custom CSS ensures that we can
                achieve precise visual effects and maintain consistency across
                the site.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={<span className="text-20">Data Fetching: SWR with MySQL</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Efficient Data Fetching
            </h3>
            <p>
              We use SWR (Stale-While-Revalidate) for efficient data fetching
              and caching in our React application. SWR helps us fetch, cache,
              and revalidate data seamlessly, ensuring that the data displayed
              is always up-to-date.
            </p>
            <ul className="text-14">
              <li>
                <strong>Automatic Revalidation:</strong> SWR automatically
                revalidates data in the background, keeping the information
                fresh and ensuring that users see the latest data without
                needing to refresh manually.
              </li>
              <li>
                <strong>Optimistic UI Updates:</strong> SWR supports optimistic
                UI updates, providing a faster and more responsive user
                experience by updating the interface immediately while fetching
                new data in the background.
              </li>
            </ul>
            <h3>Integration with MySQL</h3>
            <p>
              On the backend, we use MySQL as our database to store and manage
              data efficiently.
            </p>
            <ul className="text-14">
              <li>
                <strong>Reliable Data Storage:</strong> MySQL is a robust and
                reliable database management system that ensures data integrity
                and supports complex queries.
              </li>
              <li>
                <strong>Scalability:</strong> MySQL can handle large volumes of
                data and is suitable for applications that need to scale with
                growing user demands.
              </li>
            </ul>
          </div>
        }
      />
      <Accordion
        title={<span className="text-20">Authentication (Auth)</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Using Access Token and Refresh Token
            </h3>
            <p>
              We use access tokens and refresh tokens to ensure secure and
              protected user authentication. This approach helps in managing
              user sessions effectively and securely.
            </p>
            <h3 className="text-16 font-bold text-custom-red">
              Session Management
            </h3>
            <ul className="text-14">
              <li>
                <strong>Persistent Login:</strong> Users can log in and maintain
                their session through tokens, which ensures a smooth and
                continuous user experience.
              </li>
              <li>
                <strong>Account Creation and Management:</strong> Provides
                functionality for users to register and manage their personal
                accounts securely.
              </li>
            </ul>
          </div>
        }
      />

      <Accordion
        title={<span className="text-20">Website Functionality</span>}
        answer={
          <div>
            <h3 className="text-16 font-bold text-custom-red">
              Viewing and Interacting with Content
            </h3>
            <ul className="text-14">
              <li>
                <strong>View Posts, Post Details, and Comments:</strong> Users
                can view posts, read detailed information about each post, and
                comment without needing to log in.
              </li>
              <li>
                <strong>Like Posts and Comment:</strong> To like posts or leave
                comments, users need to create an account and log in.
              </li>
            </ul>
            <h3 className="text-16 font-bold text-custom-red">Job Listings</h3>
            <ul className="text-14">
              <li>
                <strong>View Job Listings and Details:</strong> Everyone can
                view the list of job postings and detailed information about
                each job.
              </li>
              <li>
                <strong>Apply for Jobs:</strong> To apply for job listings,
                users need to create an account.
              </li>
            </ul>
            <h3 className="text-16 font-bold text-custom-red">Job Posting</h3>
            <ul className="text-14">
              <li>
                <strong>Verified Accounts for Posting:</strong> Only verified
                accounts are allowed to post job listings, ensuring accuracy and
                security of job postings.
              </li>
            </ul>
          </div>
        }
      />
      <Accordion
        title={<span className="text-20">SEO Optimization</span>}
        answer={
          <div>
            <p>
              To ensure that our website is optimized for search engines and
              easily discoverable by users, we implement the following
              practices:
            </p>
            <ul>
              <li>
                <strong>Meta Tags:</strong> Adding helpful information to your
                website’s pages so search engines know what they are about and
                show them in search results.
              </li>
              <li>
                <strong>Quality Content:</strong> Creating useful and relevant
                content that matches what people are looking for.
              </li>
              <li>
                <strong>Image Optimization:</strong> Making sure images load
                quickly and are described properly so they help your site’s
                ranking.
              </li>
              <li>
                <strong>Internal Linking:</strong> Linking to other pages within
                your website to help users and search engines find more
                information.
              </li>
              <li>
                <strong>Mobile-Friendly Design:</strong> Ensuring your website
                looks and works well on smartphones and tablets.
              </li>
              <li>
                <strong>Faster Page Load:</strong> Speeding up your website so
                it loads quickly, making it better for users and search engines.
              </li>
            </ul>
          </div>
        }
      />
      <Accordion
        title={<span className="text-20">Analytics and Reporting</span>}
        answer={
          <div>
            <p>
              We provide tools and methods to monitor website performance and
              deliver detailed reports to our clients, including:
            </p>
            <ul>
              <li>
                <strong>Website Traffic:</strong> Information on how many people
                visit your site, where they come from, and what they do while
                they’re there.
              </li>
              <li>
                <strong>Performance Reports:</strong> Details on how fast your
                site loads and how users interact with it.
              </li>
              <li>
                <strong>Custom Reports:</strong> Tailored reports that show the
                most important information for your business.
              </li>
              <li>
                <strong>Keyword Tracking:</strong> Insights into which search
                terms bring people to your site.
              </li>
              <li>
                <strong>SEO Health:</strong> Information on how well your site
                is doing in search engine rankings and what can be improved.
              </li>
              <li>
                <strong>Improvement Tips:</strong> Suggestions based on the data
                to help make your site better and attract more visitors.
              </li>
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default FAQ;
