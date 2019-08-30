# AWS Fragate

Test container and instructions for running container inside Fargate


1. Create a AWS ECR(Elastic Container Repositories). 

   AWS -> Services -> ECR -> Create repository -> Name your repository -> Select "Mutable" -> Click on Create repository



2. Build docker image at your local machine and upload to AWS ECR

   2.1 Authenticate/Login
   ```
   aws_adfs_auth
   $(aws ecr get-login --no-include-email --region us-east-1)
   ```

   2.2 Build your docker image
   ```
   docker build -t testabc .
   docker tag testabc:latest 542356571559.dkr.ecr.us-east-1.amazonaws.com/testabc:latest
   docker push 542356571559.dkr.ecr.us-east-1.amazonaws.com/testabc:latest
   ```

3. VPC and Security Settings

   3.1 Create a IAM role to run the container. 

   Go to [OneCloud](https://onecloud.comcast.net/) and login. 

   Select **Custom Roles** -> Give a name for your role. -> Select **Basic** -> Click on **Create Custom Role**
   

   3.2 Attach Policy to this role

   AWS -> Services -> IAM -> Roles -> Find the Role you created on OneCloud -> Click on **Attach policies**.
   
   > Depends on what your container does, if it need to write to S3, you have to attach S3 Access Policy.
   
   These three roles must have.

   - AmazonEC2ContainerRegistryReadOnly
   - AmazonECS_FullAccess
   - CloudWatchFullAccess


   3.3 VPC Endpoint

   To pull the image from ECR or write log to cloud watch, you need internet access. If VPC has no internet gateway attach 
   to it, you can use endpoint to access these aws services. 

   > We already created endpoints for ecr, ecs, logs, s3 and etc...

   #### How to create endpoint

   AWS -> Services -> VPC -> Endpoints -> Click on **Create Endpoint** 

   Service category: **AWS services** 
   Service Name: **com.amazonaws.region.ecr.dkr**
   VPC: Select the VPC where you will deploy the container. 
   Enable Private DNS Name: **Check**
   Security group: Select default security group(Allow traffic from inbound and outbound)
   

   3.5 Security Group

   Security Group is like firewall/Access list, it attached to an endpoint, ec2 instance or container and filter the
   inbound and outbound traffic. You create a security group inside VPC and attached to a instance. 

   We will need a security group for our ECS container, to control what inbound traffic can reach that container and 
   what outbound traffic that container can go. 

   #### How to create security group

   AWS -> Services -> VPC -> Security Group

   Security group name: give a name to your security group
   Description: describe what traffic allow or deny by this security group
   VPC: select a VPC. 


4. ECS

   AWS -> Services -> ECS.

   4.1 Create a new cluster

   Select "Clusters" -> Click on **Create Cluster** -> Choose **Networking only** -> Next Step -> 
   Give a name to your cluster -> Don't check create a new VPC for this cluster -> **Create**


   4.2 Create a task definitions

   Select **Task Definitions** -> Click on **Create new Task Definition** -> Select **Fargate** -> Click on **Next Step** 

   Task Definition Name: Give a name to your task
   Task Role: Select the role you created at **step 3.1**
   Task execution role: same as task role
   Assign the memory and cpu.

   Click on **Add container** 

   Container name: name your container
   Image: copy the url from the ECR repository created on **Step 2**
   Configure the container env, cpu, network as needed. 

   > For **Storage and logging** section, Log configuration, check **Auto-config CloudWatch Logs**


   4.3 Run the task

   Clusters -> Select the cluster you created on **Step 4.1** -> Select **Tasks** Tab -> Click on **Run new Task** 

   Launch type: Fargate
   Task Definition: select the one you created on **Step 4.2**
   Number of tasks: depends on what you try to do. In this example, read from DB and write to S3, we just need one instance.
   Cluster VPC: which VPC you want your container to run.
   Subnets: Select all available subnets
   Security groups: Select the security group you created on **Step 3.5**

   Rest setting could leave as default. Click on **Run Task**











