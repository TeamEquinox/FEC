## FEC - Equinox Apparel 
Frontend Capstone project for the clothing retailer Atelier (rebranded as Equinox Apparel), utilizing Javascript, React, Node, Express, CSS, HTML, and deployed on AWS. Click on the banner for a surprise!

## Overview
Revamp an outdated retail product page including product overview, related products, questions and answers, and reviews.

## Tech Stack

https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black 	https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFBhttps://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white

### Description
### Product Overview

![ProductOverview](https://user-images.githubusercontent.com/108377805/231079145-24e0c7e5-0dc7-4ada-a6f7-848805bfe698.png)

* Image gallery
* Product information
* Style selector
* Add to cart

This component will guide the customer through selecting a specific style and size to add to their cart. As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

### Related products

![RelatedItems](https://user-images.githubusercontent.com/108377805/231079189-0e0ca9fb-283b-422a-9086-1033edaaf8bb.png)


The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

### Questions and answers

<img width="1399" alt="Q A" src="https://user-images.githubusercontent.com/108377805/232840002-a81dd913-f942-4918-897b-dca43c282a56.png">

The Questions & Answers module will allow asking and answering of questions for the product selected.  The functionality contained within this module can be divided into several pieces:

* View questions
* Search for a question
* Asking a question
* Answering a question

This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.

All questions will be asked and answered per product.  Specific styles will not be accounted for within the Questions & Answers module.

### Reviews:

![Reviews](https://user-images.githubusercontent.com/108377805/231079237-a4d3139e-cd54-4f20-afd5-21a4cfbb7787.png)

The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces

* Write new review
* Reviews List
* Sorting
* Rating Breakdown
* Product Breakdown

This component will extend the ability to write, read, and browse through reviews for the current product.
All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

### Installation

1. Clone the repo

```
git clone 
```

2. Install all required packages

```
npm install
```

3. Compile the client-side code with webpack

```
npm run client-dev
```

4. Start the server

```
npm run server-dev
```

5. Navigate to localhost:3001
