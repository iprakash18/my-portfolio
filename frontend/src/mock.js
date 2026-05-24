// Mock data for Prakash Iyyanarappan's Portfolio

export const profileData = {
  name: "Prakash Iyyanarappan",
  title: "Senior Technology Engineer - DevOps",
  location: "Chennai, Tamil Nadu",
  email: "iprakash18@gmail.com",
  phone: "+919677430091",
  linkedin: "https://www.linkedin.com/in/prakash-iyyanarappan/",
  medium: "https://medium.com/@iprakas_h18",
  resumeUrl: "https://customer-assets.emergentagent.com/job_pro-journal-1/artifacts/w3lwk476_Prakash_Iyyanarappan_DevOps.pdf",
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

// Mock blog posts
export const blogPosts = [
  {
    id: 1,
    title: "Building Scalable CI/CD Pipelines with Jenkins and Kubernetes",
    excerpt: "Learn how to design and implement robust CI/CD pipelines that scale with your organization's needs using Jenkins and Kubernetes.",
    content: `<h2>Introduction</h2>
<p>In today's fast-paced development environment, having a scalable CI/CD pipeline is crucial for maintaining velocity while ensuring quality. In this article, I'll share insights from implementing CI/CD pipelines at scale.</p>

<h2>Key Components</h2>
<p>A scalable pipeline requires careful consideration of several components:</p>
<ul>
<li>Jenkins as the orchestration engine</li>
<li>Kubernetes for dynamic agent provisioning</li>
<li>Helm for application packaging</li>
<li>ArgoCD for GitOps-based deployments</li>
</ul>

<h2>Best Practices</h2>
<p>Through years of experience, I've found these practices essential:</p>
<ol>
<li>Use declarative pipelines for maintainability</li>
<li>Implement proper secret management with HashiCorp Vault</li>
<li>Integrate security scanning early in the pipeline</li>
<li>Monitor pipeline performance and optimize bottlenecks</li>
</ol>

<h2>Conclusion</h2>
<p>Building scalable CI/CD pipelines is an iterative process that requires continuous refinement based on team needs and infrastructure capabilities.</p>`,
    author: "Prakash Iyyanarappan",
    publishedDate: "2025-01-15",
    readTime: 8,
    tags: ["CI/CD", "Jenkins", "Kubernetes", "DevOps"],
    category: "DevOps",
    featured: true
  },
  {
    id: 2,
    title: "Infrastructure as Code: Terraform Best Practices for AWS",
    excerpt: "Discover proven patterns and best practices for managing AWS infrastructure using Terraform, drawn from real-world implementations.",
    content: `<h2>Why Terraform?</h2>
<p>Terraform has become the de facto standard for infrastructure as code, offering a declarative approach to managing cloud resources across multiple providers.</p>

<h2>Project Structure</h2>
<p>A well-organized Terraform project is crucial for maintainability:</p>
<pre><code>terraform/
├── environments/
│   ├── dev/
│   ├── staging/
│   └── prod/
├── modules/
│   ├── vpc/
│   ├── eks/
│   └── rds/
└── shared/</code></pre>

<h2>State Management</h2>
<p>Proper state management is critical. Always use remote state with S3 and DynamoDB for locking.</p>

<h2>Security Considerations</h2>
<ul>
<li>Never commit secrets to version control</li>
<li>Use AWS Secrets Manager or Parameter Store</li>
<li>Implement least privilege IAM policies</li>
<li>Enable encryption at rest and in transit</li>
</ul>`,
    author: "Prakash Iyyanarappan",
    publishedDate: "2025-01-10",
    readTime: 10,
    tags: ["Terraform", "AWS", "IaC", "Cloud"],
    category: "Cloud Infrastructure",
    featured: true
  },
  {
    id: 3,
    title: "Implementing DevSecOps: Shifting Security Left",
    excerpt: "How to integrate security practices into your DevOps workflow without sacrificing velocity.",
    content: `<h2>The DevSecOps Mindset</h2>
<p>DevSecOps is about making security everyone's responsibility, not just an afterthought before production deployment.</p>

<h2>Tools and Integration</h2>
<p>Key tools I've successfully integrated:</p>
<ul>
<li><strong>Checkmarx</strong> - SAST for code analysis</li>
<li><strong>Semgrep</strong> - Fast pattern-based scanning</li>
<li><strong>HashiCorp Vault</strong> - Secrets management</li>
<li><strong>Trivy</strong> - Container image scanning</li>
</ul>

<h2>Pipeline Integration</h2>
<p>Security checks should be automated and fail fast:</p>
<ol>
<li>Code commit triggers security scan</li>
<li>SAST analysis in parallel with build</li>
<li>Container image scanning before push</li>
<li>Dynamic analysis in staging environment</li>
</ol>`,
    author: "Prakash Iyyanarappan",
    publishedDate: "2025-01-05",
    readTime: 7,
    tags: ["DevSecOps", "Security", "CI/CD"],
    category: "Security",
    featured: false
  },
  {
    id: 4,
    title: "Kubernetes Production Best Practices: Lessons Learned",
    excerpt: "Real-world insights from managing production Kubernetes clusters at scale across multiple organizations.",
    content: `<h2>Introduction</h2>
<p>After managing Kubernetes in production for several years across banking and e-commerce sectors, I've learned valuable lessons about what works and what doesn't.</p>

<h2>Resource Management</h2>
<p>Proper resource requests and limits are crucial:</p>
<ul>
<li>Always set resource requests and limits</li>
<li>Use Vertical Pod Autoscaler for right-sizing</li>
<li>Implement Horizontal Pod Autoscaler based on custom metrics</li>
</ul>

<h2>Security Hardening</h2>
<p>Security should be built into your Kubernetes deployment:</p>
<ul>
<li>Enable RBAC and follow principle of least privilege</li>
<li>Use Pod Security Standards</li>
<li>Implement network policies</li>
<li>Regular vulnerability scanning of images</li>
</ul>

<h2>Monitoring and Observability</h2>
<p>You can't manage what you don't measure. Implement comprehensive monitoring with Prometheus and Grafana.</p>`,
    author: "Prakash Iyyanarappan",
    publishedDate: "2024-12-28",
    readTime: 12,
    tags: ["Kubernetes", "Production", "Best Practices"],
    category: "DevOps",
    featured: false
  }
];