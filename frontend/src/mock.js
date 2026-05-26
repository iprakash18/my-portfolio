// Mock data for Prakash Iyyanarappan's Portfolio

export const profileData = {
  name: "Prakash Iyyanarappan",
  title: "Senior Technology Engineer - DevOps",
  location: "Chennai, Tamil Nadu",
  email: "iprakash18@gmail.com",
  phone: "+919677430091",
  linkedin: "https://www.linkedin.com/in/prakash-iyyanarappan/",
  github: "https://github.com/iprakash18",
  instagram: "https://www.instagram.com/prakashiyyanarappan/",
  medium: "https://medium.com/@iprakash18",
  resumeUrl: "/Prakash_Iyyanarappan_DevOps.pdf",
  profileImage: "/profile_new.jpeg",
  summary: "Highly skilled Associate Architect with around 13+ years of expertise in DevOps, specializing in Cloud Infrastructure, CI/CD pipelines, and automation. Proficient in optimizing system performance, enabling seamless deployments, and driving operational efficiency across diverse environments. Strong focus on scalability, reliability, and continuous improvement."
};

export const skills = [
  {
    category: "Cloud Platforms",
    items: ["AWS", "GCP", "Hybrid Cloud"]
  },
  {
    category: "Version Control",
    items: ["GitHub", "Bitbucket", "Azure Repository", "CodeCommit"]
  },
  {
    category: "CI/CD Tools",
    items: ["Jenkins", "Harness", "GitHub Actions", "AWS CodePipeline"]
  },
  {
    category: "Infrastructure as Code",
    items: ["Terraform", "CloudFormation"]
  },
  {
    category: "Configuration Management",
    items: ["Ansible"]
  },
  {
    category: "Container & Orchestration",
    items: ["Docker", "Kubernetes", "OpenShift", "EKS", "GKE", "Helm"]
  },
  {
    category: "Monitoring & Observability",
    items: ["ELK Stack", "Grafana", "Prometheus", "CloudWatch"]
  },
  {
    category: "Artifact Management",
    items: ["JFrog Artifactory", "Docker Hub", "ECR"]
  },
  {
    category: "Scripting Languages",
    items: ["Shell/Bash", "PowerShell", "Groovy", "YAML"]
  },
  {
    category: "DevSecOps",
    items: ["HashiCorp Vault", "Checkmarx", "Semgrep"]
  }
];

export const experience = [
  {
    id: 1,
    title: "Senior Technology Engineer",
    company: "Emirates NBD",
    location: "Chennai, India",
    period: "October 2025 - Present",
    responsibilities: [
      "Designed, implemented, and maintained CI/CD pipelines using Jenkins and Groovy for automated build, test, security scan, and deployment",
      "Managed containerized applications on OpenShift with deployment strategies, scaling, and resource optimization",
      "Implemented API management using 3scale for secure, scalable API exposure",
      "Integrated HashiCorp Vault for secure secrets management",
      "Embedded DevSecOps practices with Checkmarx and Semgrep integration",
      "Automated infrastructure provisioning using Terraform and Ansible",
      "Implemented monitoring using Prometheus and Grafana for proactive issue detection"
    ]
  },
  {
    id: 2,
    title: "Associate Architect - DevOps",
    company: "Ernst & Young (EY)",
    location: "Chennai, India",
    period: "September 2022 - October 2025",
    responsibilities: [
      "Streamlined and optimized CI/CD pipelines for major customers",
      "Managed CI/CD using AWS CodePipeline for enhanced build reliability",
      "Designed Helm Charts for deploying Amazon EKS infrastructure",
      "Utilized Terraform and CloudFormation for infrastructure automation",
      "Set up monitoring tools including ELK Stack, Grafana, Prometheus, and CloudWatch",
      "Implemented GitOps with ArgoCD for continuous delivery"
    ]
  },
  {
    id: 3,
    title: "Sr. Software Engineer II",
    company: "Rakuten",
    location: "Bangalore, India",
    period: "April 2021 - September 2022",
    responsibilities: [
      "Lead DevOps Engineer for Rakuten Credit Card Financial services",
      "Managed build VMs using Ansible for streamlined configuration",
      "Developed secure Jenkins CI/CD pipeline scripts",
      "Deployed shared service containers on Kubernetes"
    ]
  },
  {
    id: 4,
    title: "Lead Engineer",
    company: "Guidanz Inc.",
    location: "Chennai, India",
    period: "September 2016 - April 2021",
    responsibilities: [
      "Build and Release Management using Kubernetes and Docker on GCP",
      "Designed CI/CD system with Jenkins for weekly releases",
      "Managed Kubernetes container registry and deployments",
      "Set up test environments across multiple Linux distributions"
    ]
  },
  {
    id: 5,
    title: "Sr. Web Analyst",
    company: "Scope E-Knowledge Center",
    location: "Chennai, India",
    period: "December 2013 - March 2016",
    responsibilities: [
      "Managed defects on JIRA and production changes",
      "Set up build infrastructure with Jenkins",
      "Involved in functionality, performance, and system testing"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    icon: "award"
  },
  {
    id: 2,
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    icon: "award"
  },
  {
    id: 3,
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    icon: "award"
  }
];

export const education = {
  degree: "Bachelor of Technology",
  field: "Information Technology",
  institution: "Thangavelu Engineering College",
  location: "Chennai, India",
  graduationDate: "April 2012"
};
