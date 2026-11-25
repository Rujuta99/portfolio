// Everything on the page comes from here.

export const profile = {
  name: "Rujuta Tambewagh",
  role: "Software and AI/ML engineer",
  bio: "I'm a software engineer who likes building things that hold up in the real world, not just in demos. I work across the whole stack: the APIs and backend services, the data pipelines underneath, the app people actually use, and the AI that makes it smarter. I pick up new technologies quickly and enjoy figuring out how different parts of a system come together.",
  // Square photo in /public, shown as a circle next to the about text.
  photo: "/rujuta-headshot.jpg",
  email: "rujuta.tambewagh@gmail.com",
  location: "San Francisco, CA",
  // The file in /public that the Download resume button serves.
  resume: "/Rujuta_Tambewagh_Resume.pdf",
  // Little badge on the photo. Set to "" to hide it.
  photoBadge: "",
  // Rotates in the hero: "When I'm not building, I'm probably ___". Replace with your own.
  interests: ["trying new restaurants", "exploring new cities", "watching a movie", "reading a good book", "cooking something new"],
  links: {
    github: "https://github.com/Rujuta99",
    linkedin: "https://www.linkedin.com/in/rujuta-tambewagh/",
  },
}

export type Project = {
  title: string
  description: string
  tags: string[]
  /** GitHub repo URL; the card shows a GitHub link only when this is set. */
  github?: string
}

export const projects: Project[] = [
  {
    title: "Agentic Job Search Platform",
    description:
      "A full-stack job search platform that pulls 180K+ postings from 4,000+ companies and ranks them by fit. A LangGraph agent then tailors the resume and cover letter for each job.",
    tags: ["Python", "FastAPI", "LangGraph", "React", "TypeScript"],
  },
  {
    title: "Multilingual Video Intelligence Pipeline",
    description:
      "A 5-stage AWS Step Functions workflow that transcribes, translates, and summarizes video in English, Hindi, and Marathi. Processed 3 TB of archived media with PII and profanity filtering and a 120+ case validation suite.",
    tags: ["AWS Bedrock", "Transcribe", "Lambda", "Step Functions", "DynamoDB"],
    github: "https://github.com/Rujuta99/aws-video-redaction-pipeline",
  },
  {
    title: "Hybrid Causal Biomedical Retrieval",
    description:
      "Ranks biomedical papers by both semantic relevance and causal evidence, combining BioBERT embeddings and FAISS search with a Neo4j causal knowledge graph. Reached Causal MRR 0.82 and NDCG@10 0.88, beating BM25 and semantic-only baselines.",
    tags: ["Python", "BioBERT", "FAISS", "Neo4j", "spaCy"],
    github: "https://github.com/Rujuta99/Hybrid-Causal-IR",
  },
  {
    title: "LLM Fairness Evaluation for Financial Advice",
    description:
      "A multi-model pipeline across OpenAI, Gemini, and Groq that tests financial advice for different socioeconomic personas. A DeBERTa-v3 NLI framework found wealth-building concepts were omitted 7–12× more often for low-income users.",
    tags: ["Python", "Transformers", "DeBERTa", "LLM evaluation"],
    github: "https://github.com/Rujuta99/FairFinance-AI",
  },
  {
    title: "IoT Sensor Data Processing Pipeline",
    description:
      "A serverless pipeline handling 500K events a day: SNS and SQS for ingestion, idempotent Lambda processing, S3 Parquet for analytics, and DynamoDB for low-latency device state, monitored with CloudWatch.",
    tags: ["AWS Lambda", "SNS", "SQS", "S3", "DynamoDB"],
  },
  {
    title: "Urban Service Reliability Analytics Warehouse",
    description:
      "An end-to-end ETL pipeline over 157K+ Chicago 311 records: PySpark transformations, dbt models in Snowflake, Airflow orchestration, and Great Expectations tests. Revealed up to 83% longer service delays in low-income neighborhoods.",
    tags: ["Snowflake", "dbt", "PySpark", "Airflow"],
    github: "https://github.com/Rujuta99/Snowflake_dbt_Urban_Service_Analytics",
  },
]

export type Post = {
  title: string
  url: string
  /** ISO date, used for the <time> element. */
  date: string
  /** How the date is shown on the page. */
  dateLabel: string
  readTime: string
  tags: string[]
  excerpt: string
  /** Optional cover image (e.g. the post's Medium header image) and its alt text. */
  image?: { src: string; alt: string; width: number; height: number }
}

// Newest first. To add a post, copy an entry and fill in its details.
export const posts: Post[] = [
  {
    title: "A Day in the Life of an AI Request",
    url: "https://medium.com/@rujuta.tambewagh/a-day-in-the-life-of-an-ai-request-3d9fecc796f7",
    date: "2026-10-21",
    dateLabel: "October 21, 2026",
    readTime: "5 min read",
    tags: ["AI agents", "AWS"],
    excerpt:
      "One refund question, followed end to end through a production multi-agent system on AWS: sign-in, the orchestrator, specialized agents and tools, personal-data filtering, and the trace that ties it all together.",
    image: {
      src: "https://miro.medium.com/v2/da:true/resize:fill:1200:632/g:fp:0.5:0/1*wVgi69wEkfHj2g2g59ER-w.gif",
      alt: "Animated architecture diagram of a refund request moving through a multi-agent AI system on AWS",
      width: 1200,
      height: 632,
    },
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "TypeScript", "Java", "JavaScript"] },
  { group: "Web and backend", items: ["FastAPI", "Django", "Node.js", "Express", "Flask", "React", "REST APIs"] },
  { group: "AI and ML", items: ["PyTorch", "Transformers", "LangGraph", "AWS Bedrock", "RAG", "LLM evaluation", "scikit-learn"] },
  { group: "Cloud and DevOps", items: ["AWS Lambda", "API Gateway", "Step Functions", "SQS / SNS", "S3", "EC2", "CloudWatch", "Docker", "Git"] },
  { group: "Data engineering", items: ["PySpark", "Snowflake", "dbt", "Airflow", "Azure Data Factory", "Pandas"] },
  { group: "Databases and retrieval", items: ["PostgreSQL", "SQL Server", "DynamoDB", "FAISS", "Neo4j"] },
]

export type CornerItemId =
  | "memories"
  | "hamnet"
  | "tangled"
  | "dune"
  | "window"
  | "polaroid"
  | "plant"
  | "laptop"

// Notes shown when someone hovers or taps an object in the "My corner" drawing. Edit freely.
export const corner: Record<CornerItemId, { label: string; note: string }> = {
  memories: {
    label: "Memories of Murder",
    note: "One of my all-time favourites, and part of my Letterboxd top 4 ♥",
  },
  hamnet: {
    label: "Hamnet",
    note: "One of my all-time favourites, and part of my Letterboxd top 4 ♥",
  },
  tangled: {
    label: "Tangled",
    note: "One of my all-time favourites, and part of my Letterboxd top 4 ♥",
  },
  dune: {
    label: "Dune",
    note: "One of my all-time favourites, and part of my Letterboxd top 4 ♥",
  },
  window: {
    label: "The Golden Gate Bridge",
    note: "Not my actual view (I wish!), but I love this bridge.",
  },
  polaroid: {
    label: "Chicago",
    note: "Two years of grad school at UIC. I love that city, especially the skyline by the lake.",
  },
  plant: {
    label: "My plant",
    note: "Small, green, and somehow still alive.",
  },
  laptop: {
    label: "My laptop",
    note: "Where the projects and blog posts above come to life (with plenty of debugging).",
  },
}
