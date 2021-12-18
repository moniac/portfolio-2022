import { ComponentType } from "react";
import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
import * as Icon from "react-feather";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  experience: Array<{
    title: string;
    description: string;
    date: string;
    icon?: ComponentType | keyof JSX.IntrinsicElements | string;
  }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs",
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs",
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d",
      },
    ],
    experience: [
      {
        title: "Promoted to medior FE 🧑🏻‍💻",
        description: `Having worked at de Bijenkorf for a little over a year, I got promoted to medior FE. I gained a lot of experience
        due to the unique challenges a large, growing website can face, together with the support and guidance of my team members.`,
        date: "Nov 2021 - Present",
        icon: "ThumbsUp",
      },
      {
        title: "Joined de Bijenkorf! 🐝",
        description: `I had always wanted to work at a larger company on a product that is used by many many users. The Bijenkorf
        website is one of the most popular webshops in the Netherlands. I joined the amazing Checkout team, which suddenly meant
        I was responsible for making sure millions of customers could checkout successfully. An initially intimidating challenge which
        turned out to be a great learning experience.`,
        date: "July 2020",
        icon: "Briefcase",
      },
      {
        title: "Started a company 🧙‍♂️",
        description: `Together with two of my good friends, we started Level30Wizards,
        a digital agency focussed on delivering high quality websites and web applications.`,
        date: "Aug 2018 - Oct 2020",
        icon: "Briefcase",
      },
      {
        title: "Started working at Lifely",
        description: `Since the internship went so well, I was offered a part-time job, which turned into a full-time job.`,
        date: "Jan 2019 - Dec 2019",
        icon: "Briefcase",
      },
      {
        title:
          "Finished my study at the Amsterdam University of Applied Sciences 👨🏻‍🎓",
        description: `After 4 years, I was finally done with my study.
        I was very happy with my time there, and it felt bittersweet to leave the place that taught me a lot and I called my second home.`,
        date: "July 2019",
        icon: "Edit2",
      },
      {
        title: "Second intership",
        description: `Having some experience, I wanted to join a company that that could help me elevate my skills.
        Lifely was that company.
        Here I learned a lot about professional web development and got a lot of experience in React and TypeScript.`,
        date: "Sept 2018 - Jan 2019",
        icon: "Briefcase",
      },
      {
        title: "Part-time front-end job",
        description:
          "I joined LemonCake to work on a project for the trendy vegan restaurant: mr & mrs. watson.",
        date: "Sept 2017 - Nov 2017",
        icon: "Briefcase",
      },
      {
        title: "My first front-end intership",
        description: `At Diffuse I got to work with a small team of developers and got to learn a lot about the front-end development process. 
          This was an excellent internship to help me shape my skills and confirm that this was what I wanted to keep doing.`,
        date: "Apr 2015 - June 2017",
        icon: "Briefcase",
      },
      {
        title:
          "Started my study at the Amsterdam University of Applied Sciences",
        description: `Working with film editing programs like Adobe After Effects and Adobe Premiere exposed me to scripting,
        which always intrigued me. I found that this study contained a lot interesting programs, including web development, so I decided to continue my studies.`,
        date: "Sept 2015",
        icon: "Edit2",
      },
      {
        title: "Started a part-time job at a tech store for LG",
        description:
          "I sold LG household appliances, though my time was short I did learn a lot about talking directly to customers.",
        date: "Jan 2015 - April 2015",
        icon: "Briefcase",
      },
      {
        title: "Finished my film study",
        description: `Managed to get a degree in film. As much as I enjoyed my time here, I felt ultimately
         that film was more suited as a hobby than a career.`,
        date: "2015",
        icon: "Edit2",
      },
      {
        title: "Second Film intership at Guerilla",
        description: `Guerilla, known worldwide for its games such as Killzone and Horizon.
          I worked on the trailers and teasers for the games, and also setup livestreams.`,
        date: "Sep 2014 - Jan 2015",
        icon: "Briefcase",
      },
      {
        title: "Started my first internship",
        description: `My first internship was at VDO, 
        back then it was a small team existing of just the three founders and me. 
        I had a great time there and gained quite some experience.`,
        date: "Feb 2014 - June 2014",
        icon: "Briefcase",
      },
      {
        title: "Started a film & animation study",
        description:
          "I was always fascinated by film, and figured that was what I wanted to do.",
        date: "2011",
        icon: "Edit2",
      },
      {
        title: "Started working in a restaurant",
        description: "Had to start somewhere!",
        date: "April 2009 - June 2011",
        icon: "Briefcase",
      },
      {
        title: "Moved to Amsterdam",
        description:
          "My parents immigrated to the Netherlands in hopes of giving me better chances to succeed in life.",
        date: "Approx 1995",
        icon: "Home",
      },
      {
        title: "Born ",
        description: "Where it all began.",
        date: "July 1994",
        icon: "Smile",
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Home | Portfolio of Mohammed Mulazada",
    description:
      "This is the portfolio of Mohammed Mulazada, a front-end developer based in Amsterdam.",
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const { experience } = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main className="flow">
        <div className="flow">
          <h2>Welcome to my portfolio!</h2>
          <p>
            This is my little place on the internet. You can find out more about
            me here, or what I write about.
          </p>
        </div>
        <div className="about-mo flow">
          <h2>
            About <strike>Me</strike> Mo
          </h2>
          <div>
            <ol className="timeline">
              {experience.map((item) => {
                const label = item.icon || "Search";
                const IconComponent = Icon[label];
                return (
                  <li key={item.title} className="timeline-list">
                    <div className="timeline-meta">
                      <span className="timeline-icon">{<IconComponent />}</span>
                    </div>
                    <div className="timeline-description">
                      <h4>{item.title}</h4>
                      <p>{item.date}</p>
                      <p className="timeline__content">{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
