---
static: true
template: post
type: post
author: Paillat
image: /images/tor-website-docker/tor-website-docker.png
title: Tor Website Docker
description: How I easily setup a Tor website using Docker, to host this website.
---
# Tor Website Docker

<img src="<!-- image -->" alt="post main image" class="post-main-image">

## Introduction

In today's digital era, maintaining privacy and anonymity while accessing and sharing information has become increasingly important. The Tor network, known for its robust anonymity features, allows users to navigate the internet with a heightened level of privacy and security. Meanwhile, Docker, a popular containerization platform, simplifies the deployment of applications across different environments. Combining these two powerful tools, you can easily host a simple website with Docker on Tor, ensuring both privacy and convenience.

In this article, we will guide you through the process of hosting a website using Docker and enabling access to it through the Tor network. Whether you're a developer looking to safeguard user privacy or an individual interested in maintaining control over your personal web presence, this tutorial will provide you with the necessary steps to set up your own secure and anonymous website.

We will assume a basic understanding of Docker and its concepts, as well as a familiarity with the Tor network. If you're new to Docker or Tor, don't worry. The steps outlined here are straightforward and beginner-friendly, allowing you to grasp the fundamentals of both technologies along the way.

Here's an overview of what we'll cover in this tutorial:

1. Understanding Docker: We'll provide a brief overview of Docker and containerization, explaining how Docker simplifies application deployment and management.

2. Introduction to Tor: We'll introduce the Tor network, exploring its features and highlighting why it's a valuable tool for privacy-conscious individuals.

3. Building a Dockerized Website: We'll explain how to create a simple website using Docker, including writing the necessary code and configuring the Dockerfile.

By the end of this tutorial, you will have successfully hosted a simple website with Docker on Tor. This achievement will not only enable you to safeguard your online privacy but also give you the confidence to explore more advanced configurations and utilize the power of Docker and Tor for future projects.

So, let's dive in and unlock the potential of Docker and Tor for hosting your own secure and anonymous website!

## 1. Understanding Docker

Docker is a widely used containerization platform that allows you to package an application and its dependencies into a standardized unit called a container. Containers are isolated, lightweight, and portable, making it easier to deploy applications consistently across different environments. With Docker, you can encapsulate your website, including its code, libraries, and configuration, into a container image that can be run on any system with Docker installed.

![Docker Logo](/images/tor-website-docker/docker-logo.webp)

<blockquote class="image-caption">Docker Logo</blockquote>

To get started with Docker, make sure you have Docker installed on your machine. Visit the [Docker website](https://www.docker.com/get-started) and follow the installation instructions for your specific operating system.

## 2. Introduction to Tor

Tor, short for The Onion Router, is a network that provides anonymous communication over the internet. It achieves this by directing traffic through a worldwide network of volunteer-operated servers, or "nodes," which encrypt and relay data multiple times, making it difficult to trace the origin of the information. Tor protects user privacy by preventing anyone, including internet service providers and government agencies, from monitoring your online activities or tracking your location.

![Tor Logo](/images/tor-website-docker/Tor-logo.svg)

<blockquote class="image-caption">Tor Logo</blockquote>

Tor is often associated with the dark web, but it's important to note that Tor itself is not inherently illegal or malicious. It's a valuable tool for individuals seeking to maintain their privacy, bypass censorship, access region-restricted content, or host websites anonymously. By hosting your website on the Tor network, you can ensure that visitors can access your site without revealing their identity or location.

In the upcoming sections, we'll explore how to leverage the power of Docker and Tor together to host a simple website while preserving privacy and security.

## 3. Building a Dockerized Website

In this section, we'll walk through the process of creating a simple website using Docker. We are going to host a static website, which is a website that consists of HTML, CSS, and JavaScript files. Static websites are easy to set up and maintain, making them a great choice for beginners, however, this tutorial can be adapted to host any type of website, if it runs on Docker.

### 3.1. Obtaining a Tor Domain

In the realm of the Tor network, websites are not accessed through traditional domain names like those found on the regular internet. Instead, Tor utilizes its own unique addressing system called ".onion" domains. These domains are specifically designed for anonymous and decentralized communication within the Tor network.

To host your website on Tor, you'll need to obtain a Tor domain. Unlike the traditional domain registration process, where you purchase a domain from a registrar, Tor domains are self-generated and do not require any monetary transactions. These domains are automatically derived from the cryptographic keys generated on your server.

When accessing a website on the Tor network, users typically encounter a string of characters followed by the ".onion" extension. This string is the Tor domain that uniquely identifies the website within the Tor network. For example, a Tor domain may look something like this: "duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" (the Tor domain for the search engine DuckDuckGo).

Generating a Tor domain involves creating a hidden service on your server, which acts as the bridge between the regular internet and the Tor network. The hidden service allows your website to be accessed through Tor while maintaining the anonymity of both the visitors and the server hosting the site.

In the upcoming section, we will guide you through the process of obtaining a Tor domain by generating your domain's cryptographic keys and configuring the hidden service.

### 3.2. Generating Cryptographic Keys

In order to generate our cryptographic keys, we will use a tool called [mkp224o](https://github.com/cathugger/mkp224o). In order to use it, you can download the latest release from the [releases page](https://github.com/cathugger/mkp224o/releases). Download the latest release for your operating system, and extract the archive. Then open a terminal in the extracted folder. If you don't know how to do that, you shouldn't be reading this tutorial.

You now need to choose a prefix for your domain. This prefix will be what your website's domain will start with. For example, if you choose the prefix "mywebsite", your domain will look like this: "mywebsiteawholebunchofcharacters.onion". The time it will take to generate the keys depends on the prefix you choose. The longer the prefix, the longer it will take to generate the keys. You can learn more about this in the [mkp224o README](https://github.com/cathugger/mkp224o/blob/master/OPTIMISATION.txt).

Once you have chosen a prefix, run the following command in the terminal, replacing "test" with your chosen prefix:

Windows:

```bash
mkp224o.exe -d test test -s
```

Linux:

```bash
./mkp224o -d test test -s
```

macOS:

```bash
./mkp224o -d test test -s
```

And now wait. It will take a while. Once it's done, you will have a folder called "test" in the same directory as the mkp224o executable. This folder contains the keys for your domain.

### 3.3. Encoding the Cryptographic Key to Base64

I created a simple python script to encode the private key to base64. Here is it:

```python
import base64

key_file_path = 'hs_ed25519_secret_key'  

with open(key_file_path, 'rb') as key_file:
    key_data = key_file.read()

encoded_key_data = base64.b64encode(key_data)

with open('base64_encoded_key.txt', 'wb') as encoded_key_file:
    encoded_key_file.write(encoded_key_data)
```

You can simply copy this in a file called "encode.py" in the created folder, and run it with python. It will create a file called "base64_encoded_key.txt" in the same folder. This file contains the base64 encoded private key. You will need this later.

### 3.4. Creating the docker-compose.yml File

Now take an entirely new  folder, and create a file called "docker-compose.yml" in it. This file will contain the configuration for your website. Here is an example configuration, that you can copy and paste in your file:

```yaml
version: "2"
services:
  tor: # The Tor hidden service
    image: goldy/tor-hidden-service:0.3.5.8 # The image to use
    environment:
        SERVICE1_TOR_SERVICE_HOSTS: 80:apache:80 # The port to expose. Here, it's port 80 of the container "apache", exposed on port 80 of the website.
        SERVICE1_TOR_SERVICE_KEY: | # The base64 encoded private key. You can get it from the file you created earlier. 
            PASTE YOUR BASE64 ENCODED KEY HERE
        SERVICE1_TOR_SERVICE_VERSION: '3' # The version of the hidden service. You can leave it at 3.
  apache: # The web server. You can replace it with any other web server or app you are using. If the port changes, you will need to change the port in the tor service above.
    image: httpd:2.4
    volumes:
      - /path/to/your/website:/usr/local/apache2/htdocs/ # The path to your website files. You can replace it with the path to your website files, in case you want to use apache.
```
 
**Remember to replace the values in the configuration with your own values. The comments in the configuration should help you.**

### 3.5. Running the Website

Now that you have created the configuration file, you can run your website. To do so, open a terminal in the folder containing the configuration file, and run the following command:

```bash
docker-compose up -d
```

This will start your website. It is now accessible on Tor. You can find the domain in the previously created folder, in the file called "hostname". You can now share this domain with your friends, and they will be able to access your website trough Tor.

## 4. Conclusion

In this guide, we've walked you through the steps to host your own anonymous website using Docker and the Tor network. We have discussed the benefits and features of Docker and Tor, as well as provided a detailed step-by-step tutorial on creating a Dockerized website accessible via a Tor domain. We've also touched on generating cryptographic keys, encoding them into Base64 format, and creating a docker-compose.yml file to configure your website.

From understanding the importance of privacy and anonymity in today's digital age to executing practical steps for achieving it, we trust that this article will provide valuable insights and tools for your journey into the world of secure and private web hosting. 

Keep in mind that this guide was designed with a static website in mind, but the principles can be applied to other types of websites as long as they run on Docker. Whether you are a developer seeking to fortify your applications' privacy or an individual wanting to maintain control over your online presence, the combination of Docker and Tor proves to be a potent duo for ensuring online anonymity and security.

As we conclude, it is important to remember that while these tools provide a level of privacy and anonymity, they are not a magic bullet solution. Regularly update your knowledge and stay informed about the latest trends in online security. Your journey in ensuring a private and secure online presence continues beyond this tutorial, and we wish you the best on this path. Remember, knowledge is power and privacy is a right. Continue to strive for both.

## 5. References

- [Docker](https://www.docker.com/)
- [Tor](https://www.torproject.org/)
- [Goldy tor-hidden-service Docker image](https://hub.docker.com/r/goldy/tor-hidden-service)
- [mkp224o](https://github.com/cathugger/mkp224o)
- [chatGPT](https://chat.openai.com/)