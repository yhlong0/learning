# AWS Certified Solutions Architect Associate Certification SAA-C02

### IAM (Identity and Access Management)

1. User

   - Root user
   - IAM user (recommend)
   - User can belong to multiple group

2. Group

   - Group can only contain users, cannot contain other group

3. Policy
   - Users or groups can be assigned policies.
   - Follow least priviledge principle
   - Permission boundary, User can attach a permission policy to principal, however, the effective permission of the principal(the person with highest authority) cannot exceed the boundary that you defined.
   - **Service Control Policies(SCP)**, a organization policy that you can use to manage/cental control permissions in your organization. Ensure your accounts stay within your organization’s access control guidelines, guardrail, or sets limits.

4. Roles
   - Some AWS service will need to perform actions on your behalf, to do so, we will assign permissions to AWS services with IAM Roles. e.g. Lambda function roles to access other aws services.
   - Assume role, for other accounts to access your stuff, you can create a role for trusting acct, trusted acct can assume the role and access the trusting acct resouces. Obtain temporary security credentials STS to make API calls.
   - **External ID**, give a third party access to your AWS resources, thid party create external id, you create IAM role with a permission policy and trust policy. Trust policy specifies who can assume the role. Third party calls the AWS sts:AssumeRole API to access your resources.

### EC2

1. Types

   - General Purpose
   - Compute Optimized
   - Memory Optimized
   - Accelerated Computing
   - Storage Optimized
   - Nitro, higher Speed EBS(64,000 IOPS)
   - M3 vs M1, same CPU, Memory, M3(recommend) is cheaper, more consist, better performance, can add better ssd. M1 however can have more disk space in case you need. 
   
2. Naming convention

   - m5.2xlarge, m:instance class, 5: generate, 2xlarge: size

3. Purchasing Options
   - Billing start when EC2 initiates the boot sequence of AMI, ends when shuts down. 
   - On-Demand Instances: short workload, predictable pricing
   - Reserved(minimum 1 year):
     - Reserved Instances: long workloads
     - Convertible Reserved Instances: long workloads with flexible instances
     - Scheduled Reserved Instances: Thursday 3-5 pm
   - Spot Instances: short workloads, cheap, can lose (less reliable)
   - Dedicated Hosts: book an entire physical server, control instance placement.
   - Dedicated Instances are Amazon EC2 instances that run in a VPC on hardware that's dedicated to a single customer. physically isolated, Pay for Dedicated Instances On-Demand, save up to 70% by purchasing Reserved Instances, or save up to 90% by purchasing Spot Instances.

4. EC2 instance Roles, access other services on your behalf.
5. Launch Types(On-demand, Spot Instances, Spot Fleet)
   - A Spot Fleet is set of Spot Instances and optionally On-Demand Instances 
7. Private IP, Public IP, Elastic IP, Elastic Network Interfaces(ENI), Nitro, vCPU, Capacity Reservations
8. EC2 Placement Groups
   - Cluster placement, same rack, best network speed between instances 10G+, can span peered VPCs, can't span multiple Availability Zones, if you try to add more instances to the placement group later, or if you try to launch more than one instance type in the placement group, you increase your chances of getting an insufficient capacity error, launching multiple instance type reduces the likelihood that the required capacity will be available.
   - Partition placement, each partition = rack, up to 7 partitions per AZ, multiple AZ, same Region, 100+ EC2 instances, Dedicated Instances can have a maximum of two partitions.
   - Spread placement, go to different rack when deploy, each AZ max can deploy 7 instances, can span to multiple AZ, same Region, are not supported for Dedicated Instances.

8. Hibernate, saves the contents from the instance memory to your EBS root volume. Amazon EC2 persists the instance's EBS root volume and any attached EBS data volumes. Good for application takes a long time to bootstrap, or use for pre-warm the instance.
9. EBS storage (Elastic Block Store)
   - 1 IOPS = 256KB I/O
   - By default, the root volume for an AMI backed by Amazon EBS is deleted when the instance terminates. Non-root EBS volumes remain available even after you terminate an instance.
   - EBS volume types
     - Provides a balance of price and performance. We recommend these volumes for most workloads.
       - SSD General Purpose, IOPS 16,000, gp3(1000 MiB/s), gp2(250 Mib/s)
     - Mission-critical, low-latency, or high-throughput workloads, **optimized for transactional**
       - SSD Provisioned IOPS, io2 Block Express, IOPS 256,000, throughput 4,000 MiB/s
       - SSD Provisioned IOPS, io2, IOPS 64,000, throughput 1,000 MiB/s, durability 99.999%
       - SSD Provisioned IOPS, io1, IOPS 64,000, throughput 1,000 MiB/s, durability 99.8-99.9%
     - HDD Throughput Optimized, st1, IOPS 500, throughput 500 MiB/s
     - HDD Cold HDD, sc1, IOPS 250, throughput 250 MiB/s
   - EBS Multi-Attach
   - EBS Encryption
   - EBS RAID configurations

10. EFS
    - EFS support unix-style r/w/e permission based on user ID and group IDs
    - EFS Access Points can override user ID and group IDs, to manage application access
    - Attach IAM policy to your file system, control who can mount your file system
    - Use VPC security groups to control the network traffic to and from your file system.
    - EFS storage classes
      - Standard
      - Standard infrequent Access
      - EFS One zone
      - EFS One Zone-IA
    - Can have lifecycle policy, move to EFS Infrequent Access
    - EFS also has intelligent tier.
    - EFS Throughput has two modes:
      - Bursting, EFS scales as the size of your file system in the EFS Standard or One Zone storage class grows.
      - Provisioned, you can instantly provision the throughput of your file system (in MiB/s) independent of the amount of data stored.
11. Lightsail
    - Lightsail gets you started quickly with preconfigured Linux and Windows application stacks and an intuitive management console.
    - Free Static IP, DNS management, 1-click SSH, RDP, SSD
12. AWS Batch schedule run parallel full range of AWS compute services and features, such as AWS Fargate, Amazon EC2 and Spot Instances.

### High Availability and Scalability: ELB & ASG

1. Elastic Load Balancing types (can select ec2s as target)
   - Classic load balancer
   - Application load balancer
   - Network load balancer (layer 4)
     - Different target groups for different types of requests. For example, one target group for general requests and other target groups for microservices
     - After receives a connection request, it select a target from the target group. TCP connection.
     - Target can be IP or Instance ID. You can't specify publicly routable IP addresses, If you specify targets using an instance ID, traffic is routed to instances using primary private IP.

2. ELB configurations
   - Sticky Sessions
   - Cross Zone Load Balancing
   - SSL Certificates
   - Connection Draining

3. Auto Scaling Group (ASG)
   - Scaling Policies
     - Launch configuration(old), ASG based on configuration launch a specific instances type, can't do multiple instances types using on-demand and spot. To update configuration, need to create a new one and modify ASG to use this new config.
     - launch template is more power, multiple instance types, desired scale, performance and cost.
   - Scaling Types
     - Manual Scaling
     - Dynamic scaling(need cloudWatch alarm, for step and simple scaling, specify the high and low thresholds for the alarm, define add or remove, how many, set to exact size)
         - Target tracking
         - Step scaling, better choice, no cool down, can be triggered by alarm multiple times. 
         - Simple scaling, based on single alarm, has cool down period before responding to additional alarms. See effects before scale again. 
     - Predictive scaling(ML, history data), Forecast only mode, collect data, Forecast and scale mode, really start make change. Use cases:
         - Increase the number of EC2 instances in advance of daily and weekly patterns in traffic flows.
         - High use regular hours, low use evening weekends
         - Recurring on-and-off workload
         - App take long time initialize during scale out event.
     - Scheduled scaling

4. Elastic IP Address(EIP) 5 per region, due to IPv4 scarce
5. Availability Zones are all within 100 km (60 miles)

## Storage

### S3

- Standard infrequent Access, S3 Standard-IA is for data that is accessed less frequently, but requires **rapid access** when needed.
- One Zone-infrequent Access, still **rapid access**, want a lower-cost option for infrequently accessed data but do not require the availability and resilience of S3 Standard or S3 Standard-IA, 20% cheaper, secondary backup
- Glacier
  - Long-term storage, has vault lock(create policy such as “write once read many” and set no longer change) to meet compliance
  - Archive Retrieval Options:
    - **Expedited** retrieve in 1-5 minutes
    - **Standard** retrieve 3-5 hours
    - **Bulk** retrieve 5-12 hours
- S3 Glacier Deep Archive (S3 Glacier Deep Archive), lowest-cost, high-regulated retain data sets for 7-10 years or longer, Retrieval time within 12 hours
- **S3 Object Lock**, you can store objects using a write-once-read-many (WORM) model. Object Lock can help prevent objects from being deleted or overwritten for a fixed amount of time or indefinitely. 
- Strong read-after-write consistency automatically. As soon as you write, you will be able to read the latest version.
- **Sync command** to copy objects between s3 buckets. Up to many PBs?
- S3 console cannot be used to transfer 1PB of data from one bucket to another.
- Cross-region replication is for async copying new objects, Minimize latency for different region user access it.
- S3 Intelligent-Tiering, for unknown log access pattern, one tier for frequent access, one lower-cost tier optimized for infrequent access.
- **Origin Access Identity** to only allow cloudFront access to the s3 files.
- By default, s3 object is owned by aws account that uploaded it, if you want bucket owner able to access it, need to explicityly grant them.
- S3 **Transfer acceleration** transfers of files over long distances between your client and an S3 bucket. Takes advantage of CloudFront. As the data arrives at an edge location, the data is routed to Amazon S3 over an optimized network path. Use case: Global customers upload files to a centralized bucket. Transfer a regular basis across continents.
- **Requester Pays buckets**, the requester instead of the bucket owner pays the cost of the request and the data download from the bucket. The bucket owner always pays the cost of storing data. (Share s3 with your customers)


### DynamoDB

1. Auto scaling, good for predict traffic, cheaper than On Demand, DynamoDB-> Utilization metrics -> Cloudwatch Alarm -> Auto scaling
2. On-Demand, good for unpredict traffic, cost more 
3. Statically provision WCU and RCU, Auto scaling, or Blended reserved capacity.
 

### Redshift

1. Data warehouse for large scale data set analysis and storage. 
2. Redshift Spectrum can quickly run query against s3 without load data to Redshift.
3. You can deploy to multi-region or multi-availability zone (AZ) clusters.
4. RedShift Snapshots are point-in-time backups of a cluster, automated and manual. Redshift stores these snapshots internally in Amazon S3. You can set copying snapshots to another AWS Region.

### RDS

1. Can have standby instance
2. With Amazon RDS Multi-AZ, you get enhanced availability and durability for database (DB) instances within a specific AWS Region.
3. Amazon RDS Read Replicas provide enhanced performance and durability for RDS database (DB) instances. Use for elastically scale out of read-heavy workloads. Read replicas can also be promoted when needed to become standalone DB instances.
4. Amazon RDS creates a second DB instance using a snapshot of the source DB instance. It then uses the engines' native asynchronous replication to update the read replica whenever there is a change to the source DB instance.
5. RDS for **Oracle Read Replicas**, when running mission-critical databases with a business requirement for your DR configuration to span across different Regions. At the same time, you want to use your DR investments to handle some of your production read workloads in another Region closer to the users.
6. RDS for **Oracle Mounted DB Replicas** are ideal if you just need DR but don’t have the requirement to route your read workloads to the replica.
7. RPO(recover point, the lastest backup) and RTO(recover time, how long service back online) with Amazon RDS for Oracle’s managed HA and DR capabilities
   - RDS Multi-AZ, RPO 0, RTO 1-2 mins
   - Snapshot restore, RPO hours, RTO < 1 hour
   - Read replica, RPO minutes, RTO minutes
   - Mounted replica, RPO minutes, RTO minutes

### Aurora

1. Primary DB + Replicas(max 15, read only).
2. Cluster storage volume spans multiple Availability Zones, with each Availability Zone having a copy of the DB cluster data.


### Storage Gateway

Run a gateway virtual machine/gateway hardware appliance on premise, set aws acct and ip, then it will integrated with cloud coressponding storage(S3, Glacier, FSx Windows, EBS). Retain access to the migrated data and for ongoing updates from on-premises files.

1. S3 File Gateway, offers SMB or NFS-based access to data in Amazon S3 with local caching.
2. FSx File Gateway, for Windows File Server, SMB-based group shares
3. Tape Gateway
4. Volume Gateway, cloud-backed iSCSI block storage volumes
   - Cache mode, your primary data is stored in Amazon S3, while retaining your frequently accessed data locally in the cache for low latency access.
   - Stored mode, your primary data is stored locally and your entire dataset is available for low latency access on premises while also asynchronously getting backed up to Amazon S3

### Data Sync

AWS DataSync is an online data transfer service that simplifies, automates, and accelerates moving data between on-premises storage systems and AWS Storage services, as well as between AWS Storage services. DataSync can copy data between Network File System (NFS) shares, Server Message Block (SMB) shares, self-managed object storage, AWS Snowcone, Amazon Simple Storage Service (Amazon S3) buckets, Amazon Elastic File System (Amazon EFS) file systems, and Amazon FSx for Windows File Server file systems.

1. on premises file system -> DataSync Agent, S3 on Outposts, Snowcone -> AWS Direct Connect/Internet -> AWS DataSync -> S3/EFS/FSx
2. s3/EFS/FSx <-> DataSync <-> s3/EFS/FSx

### FSx

1. **Lustre**, High-performance file system, Lustre integrates with Amazon S3, provides the ability to both process the 'hot data' in a parallel and distributed fashion as well as easily store the 'cold data' on Amazon S3.
2. **Windows File Server**, Service Message Block (SMB) protocol, administrative features such as user quotas, end-user file restore, and Microsoft Active Directory (AD) integration. Does not allow you to present S3 objects, cannot reference the "cold data"

### AWS Server Migration Service (AWS SMS)

SMS automates the migration of your on-premises VMware vSphere, Microsoft Hyper-V/SCVMM, and Azure virtual machines to the AWS Cloud.

### AWS Transfer

Transfer Family provides fully managed support for file transfers directly into and out of Amazon S3 or Amazon EFS. With support for Secure File Transfer Protocol (SFTP), File Transfer Protocol over SSL (FTPS), and File Transfer Protocol (FTP)

### CloudFront

1. Edge locations make sure that popular content can be served quickly to your viewers. CloudFront also has regional edge caches that bring more of your content closer to your viewers, even when the content is not popular enough, to help improve performance for that content. Regional edge caches help with all types of content, particularly content that tends to become less popular over time. Video, photos, or artwork and news and event-related content that might suddenly find new popularity.
2. Can combine with WAF to limit access only to certain IPs and etc.
3. Price classes provide you an option to lower the prices you pay to deliver content out of Amazon CloudFront. Because we charge more where our costs are higher, this means that you pay more to deliver your content with low latency to end-users in some locations. Price Classes let you reduce your delivery prices by excluding Amazon CloudFront’s more expensive edge locations from your Amazon CloudFront distribution.
4. CloudFront Using field-level encryption to help protect sensitive data
5. Lambda@Edge runs your code globally at AWS locations close to your users, so you can deliver full-featured, customized content with high performance, and low latency. Customize your content delivery, dynamically.

### AWS Global Accelerator

A networking service that helps you improve the availability and performance of the applications that you offer to your global users(e.g. Live sports to global users). User -> Edge location -> AWS Global Accelerator -> Endpoint group -> Application Endpoints

1. **Directing users to different instances of the appp in different regions based on latency.** 
2. It provides static IP addresses that provide a fixed entry point to your applications and eliminate the complexity of managing specific IP addresses for different AWS Regions and Availability Zones. 
3. Always routes user traffic to the optimal endpoint based on performance, reacting instantly to changes in application health, your user’s location, and policies that you configure. 
4. A good fit for non-HTTP use cases, such as gaming (UDP), IoT (MQTT), or Voice over IP. 


### Route 53

1. Simple routing policy – Use for a single resource that performs a given function for your domain, for example, a web server that serves content for the example.com website. Can return *multiple IPs, but unable to health check*.
2. Failover routing policy – Use when you want to configure active-passive failover.
3. Geolocation routing policy – Use when you want to route traffic based on the location of your users.
4. Geoproximity routing policy – Use when you want to route traffic based on the location of your resources and, optionally, shift traffic from resources in one location to resources in another.
5. Latency routing policy – Use when you have resources in multiple AWS Regions and you want to route traffic to the Region that provides the best latency with less round-trip time.
6. Multivalue answer routing policy – Resolve domain to multiple IPs, can enable health check, only return health IPs up to 8. 
7. Weighted routing policy – Use to route traffic to multiple resources in proportions that you specify.
8. Hosted zone, a container for records, which include information about how you want to route traffic for a domain (such as example.com) and all of its subdomains (such as www.example.com, retail.example.com, and seattle.accounting.example.com).
9. Route 53 **alias records** let you route traffic to selected AWS resources, such as CloudFront and S3 buckets. They also let you route traffic from one record in a hosted zone to another record.
10. Active-Active Failover, all resources to be available. Active-Passive, only primary available. 
11. TLD(top level domain), the last part of a domain name, such as .com, .org, or .ninja.

### SQS

1. FIFO queue support < 3000 message /second with batching, without batching, 300 message/second
2. Cannot convert standard queues to FIFO queue.
3. Unlimit number of queues and messages, default store 4 days. 

### VPC & Network

1. VPC sharing is one organization, multiple AWS accounts, share the subnets.
2. AWS Transit Gateway connects VPCs and on-premises networks through a central hub.
3. VPN CloudHub
   - If you have multiple AWS Site-to-Site VPN connections, you can provide secure communication between sites using the AWS VPN CloudHub.
4. PrivateLink = VPC endpoints + Gateway endpoints
5. NAT gateway must associate an elastic IP address at creation.

## Security

1. Security Groups = network security, control how traffic is allowed into or out of EC2. *only contain allow rules*, stateful
2. Network ACL, operates at subnet level, support allow or deny, lower number(Priority) will be evaluate first, stateless
3. AWS KMS solution uses an *envelope encryption strategy* with customer master keys (CMKs). Envelope encryption is the practice of encrypting plaintext data with a data key, and then encrypting the data key under another key. Use CMKs to generate, encrypt, and decrypt the data keys that you use outside of AWS KMS to encrypt your data. CMKs are created in AWS KMS and never leave AWS KMS unencrypted.


### GuardDuty

GuardDuty is a threat detection service that continuously monitors for malicious activity and unauthorized behavior to protect your AWS accounts, workloads, and data stored in Amazon S3.

### Sheild

Protect against DDoS attack

### Amazon Macie

Macie is a fully managed data security and data privacy service(PII) that uses machine learning and pattern matching to discover and protect your sensitive data in AWS.

### WAF(Web Application Firewall)

1. Application load balancer + WAF prevent XSS(cross site scripting) attacks, you can create XSS match conditions at WAF to identify the web requests.
2. WAF has a feature of Geographic match condition.
3. Can monitor HTTP(S) request forward to CloudFront, API Gateway, Rest API, ALB, AppSync, GraphQL API.
4. Control access by source IP addresses or value of **query strings**.

### AWS Config 
Deployed in account, can reacts to resource config and compliance change and send to cloudwatch, it can schedule run daily

### AWS Trusted Advisors

Trusted Advisors provides recommendations that help you follow AWS best practices. Trusted Advisor evaluates your account by using checks. These checks identify ways to optimize your AWS infrastructure, improve security and performance, reduce costs, and monitor service quotas. You can then follow the check recommendations to optimize your services and resources.

### Amazon Inspector(Security Assessment)

Inspector is an automated security assessment service that helps improve the security and compliance. Inspector assesses applications for exposure, vulnerabilities, and deviations from best practices. After performing an assessment, Amazon Inspector produces a detailed list of security findings prioritized by level of severity. These findings can be reviewed directly or as part of detailed assessment reports which are available via the Amazon Inspector console or API. Inspector check for unintended network accessibility of your Amazon EC2 instances and for vulnerabilities on those EC2 instances. Amazon Inspector assessments are offered to you as pre-defined rules packages mapped to common security best practices and vulnerability definitions. Examples of built-in rules include checking for access to your EC2 instances from the internet, remote root login being enabled, or vulnerable software versions installed. These rules are regularly updated by AWS security researchers.

### Cost Explorer

1. Blended costs, the average cost of usage across the consolidated billing family
2. Unblended costs, separate discounts into their own line items. This enables you to view the amount of each discount received.
3. Net Unblended costs, reflects the cost after discounts.
4. Amortized costs, show the costs are amortized over the billing period.
5. Net Amortized costs, amortizes the upfront and monthly reservation fees while **including discounts**
