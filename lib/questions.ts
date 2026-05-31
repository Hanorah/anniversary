export type Question = {
  id: number;
  question: string;
  options: string[];
  correct: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What is the full name of Church Plus?",
    options: [
      "Church of God Mission International Church Plus",
      "Christ Apostolic Mission Church Plus",
      "Church of God Ministry International Church Plus",
      "Christ Gospel Mission International Church Plus",
    ],
    correct: "Church of God Mission International Church Plus",
  },
  {
    id: 2,
    question: "Who founded Church Plus?",
    options: [
      "Rev. Dr. Carl Umakhihe",
      "Rev. Emmanuel Ubamadu",
      "Archbishop Benson Idahosa",
      "Rev. Osas Oghogho",
    ],
    correct: "Rev. Emmanuel Ubamadu",
  },
  {
    id: 3,
    question: "What year was Church Plus founded?",
    options: ["2005", "2008", "2011", "2015"],
    correct: "2008",
  },
  {
    id: 4,
    question: "Who is the current Senior Pastor of Church Plus?",
    options: [
      "Pst Imoghome Umakhihe",
      "Rev. Mrs. Eki Aighiobayi",
      "Rev. Dr. Carl Umakhihe",
      "Rev. Osas Oghogho",
    ],
    correct: "Rev. Dr. Carl Umakhihe",
  },
  {
    id: 5,
    question:
      "What year did Rev. Dr. Carl Umakhihe take over the vision of Church Plus?",
    options: ["2021", "2018", "2020", "2022"],
    correct: "2020",
  },
  {
    id: 6,
    question: "What is the tagline of Church Plus?",
    options: [
      "Built on Faith, Standing on Grace",
      "Changed by God's Word to Change Our World",
      "Rooted in Christ, Growing in Love",
      "Serving God with Excellence",
    ],
    correct: "Changed by God's Word to Change Our World",
  },
  {
    id: 7,
    question: "What is the Mission Statement of Church Plus?",
    options: [
      "To build people into global leaders",
      "To spread the gospel and develop women leaders rooted in Christ",
      "To serve the community through medical missions",
      "To raise an army for the gospel to all nations",
    ],
    correct: "To spread the gospel and develop women leaders rooted in Christ",
  },
  {
    id: 8,
    question: "What is the Vision Statement of Church Plus?",
    options: [
      "Spreading the gospel to all nations",
      "Building people into leadership with a global passion, deeply rooted in Christ",
      "Developing women leaders in the church",
      "Creating a community of love and compassion",
    ],
    correct:
      "Building people into leadership with a global passion, deeply rooted in Christ",
  },
  {
    id: 9,
    question: "Who founded Church of God Mission International (CGMi)?",
    options: [
      "Rev. Emmanuel Ubamadu",
      "Archbishop Margaret Idahosa",
      "Archbishop Benson Idahosa",
      "Rev. Dr. Carl Umakhihe",
    ],
    correct: "Archbishop Benson Idahosa",
  },
  {
    id: 10,
    question: "What was CGMi originally called when it started in 1962?",
    options: [
      "Grace Fellowship",
      "Calvary Fellowship",
      "Gospel Mission International",
      "Church of God Assembly",
    ],
    correct: "Calvary Fellowship",
  },
  {
    id: 11,
    question: "What is the CGMi motto?",
    options: [
      "Faith and Excellence in All Things",
      "Love God, Love People",
      "Evangelism our Supreme Task",
      "Going to the Nations with Grace",
    ],
    correct: "Evangelism our Supreme Task",
  },
  {
    id: 12,
    question: "What is the address of Church Plus?",
    options: [
      "No 45, Ugbowo Road, Benin City",
      "No 154, Siluko Road, Benin City",
      "No 12, Airport Road, Benin City",
      "No 7, Sapele Road, Benin City",
    ],
    correct: "No 154, Siluko Road, Benin City",
  },
  {
    id: 13,
    question: "What time does the Sunday service hold?",
    options: ["6am – 8am", "8am – 10am", "9am – 11am", "10am – 12pm"],
    correct: "8am – 10am",
  },
  {
    id: 14,
    question: "What day and time is Bible Study held?",
    options: [
      "Tuesday at 5pm",
      "Thursday at 6pm",
      "Wednesday at 5pm",
      "Friday at 7am",
    ],
    correct: "Wednesday at 5pm",
  },
  {
    id: 15,
    question: "When is Fasting and Prayer held?",
    options: [
      "Every last week of the month,",
      "Every first week of the month,",
      "Every second Saturday, all day",
      "Every Sunday,",
    ],
    correct: "Every first week of the month,",
  },
  {
    id: 16,
    question: "What is Variety Sunday?",
    options: [
      "A special Sunday held every first Sunday of the month",
      "A special Sunday held every last Sunday of the month",
      "A monthly outreach Sunday",
      "A Sunday dedicated to children's ministry",
    ],
    correct: "A special Sunday held every last Sunday of the month",
  },
  {
    id: 17,
    question: "Who is the Assistant pastor of Church Plus?",
    options: [
      "Pst Imoghome Umakhihe",
      "Rev. Mrs. Osaheni",
      "Rev. Osas Oghogho",
      "Rev. Mrs. Eki Aighiobayi",
    ],
    correct: "Rev. Osas Oghogho",
  },
  {
    id: 18,
    question: "Who is the Head of Accounting at Church Plus?",
    options: [
      "Mrs Lauretta Okhuomaruyi",
      "Rev. Mrs. Eki Aighiobayi",
      "Rev. Osas Oghogho",
      "Rev. Mrs. Osaheni",
    ],
    correct: "Mrs Lauretta Okhuomaruyi",
  },
  {
    id: 19,
    question: "What is the anniversary theme for this year?",
    options: [
      "Rooted in faith, walking in love",
      "Called to serve, sent to win souls",
      "Growing together in grace and truth",
      "Built by grace sustained by glory",
    ],
    correct: "Built by grace sustained by glory",
  },
];
