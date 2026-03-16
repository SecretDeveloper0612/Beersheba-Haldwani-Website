import React from "react";
import Heading3 from "../heading3";

const Sessions = () => {
  return (
    <section className="container p-5 lg:p-10">
      <Heading3 title="Session 2024-2025" />
      <div className="lg:p-10">
        <p className="text-gray-600">
          At{" "}
          <span className="text-[#3B2565] font-semibold">
            Beersheba School, Haldwani
          </span>{" "}
          we stand for respect towards a learner. Our aim is to impart to our
          student’s superior education in a safe environment which is conducive
          for creating academic and co-curricular excellence and empower our
          students with skills as critical thinking, problem solving, cognitive
          and somatic abilities to shape them as versatile individuals who are
          paragons of collaboration and teamwork, creativity and imagination.
        </p>

        <div className="overflow-x-auto lg:max-w-4xl mx-auto">
          <table className="w-full my-10 text-[#3B2565] border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="border-2 border-[#3B2565] py-3 px-5">Section</th>
                <th className="border-2 border-[#3B2565] py-3 px-5">Classes</th>
                <th className="border-2 border-[#3B2565] py-3 px-5">
                  Subjects
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(A)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Primary (Subject taught in I to V)
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English, Hindi, Mathematics, General Science, Social Studies,
                  Sanskrit (V Std.), General Knowledge, Moral Science, Music,
                  Painting & Computer.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(B)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Middle (VI, VII, VIII)
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English, Hindi, Mathematics, General Science, Social Studies,
                  Sanskrit, General Knowledge, Moral Science, Music, Painting &
                  Computer.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(C)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Secondary (IX & X)
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English, Hindi, Mathematics, General Science, Social Studies,
                  Work Experience & Physical health Education, Art and Computer.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(D)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Senior Secondary (XI & XII): Science Stream
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English (Core), Hindi, Physics, Chemistry, Mathematics,
                  Biology, Computer Science, Physical Education and Yoga.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(E)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Senior Secondary (XI & XII): Commerce Stream
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English (Core), Hindi, Business Studies, Accountancy,
                  Economics, Mathematics, Physical Education, Informatics
                  Practice and Yoga.
                </td>
              </tr>
              <tr>
                <td className="border-2 border-[#3B2565] py-3 px-5">(F)</td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  Senior Secondary (XI & XII): Humanities Stream
                </td>
                <td className="border-2 border-[#3B2565] py-3 px-5">
                  English (Core), Political Science, Geography, Sociology,
                  Economics, Physical Education, Hindi, History, Psychology,
                  Yoga.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Sessions;
