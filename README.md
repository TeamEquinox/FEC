## FEC - Equinox Apparel

## Overview
Revamp an outdated retail product page including product overview, related products, questions and answers, and reviews.

### Description
1. Product overview

* Image gallery
* Product information
* Style selector
* Add to cart

This component will guide the customer through selecting a specific style and size to add to their cart. As such, portions of the Overview module, such as the image gallery and cart selection, will be specific to a SKU chosen as opposed to the overarching product.

2. Related products

The Related Items & Comparison module will display two sets of related products.  The first set will be a list of products, determined internally, that are related to the product currently being viewed.  The second set will be a list, custom created by the user, of products which the user has grouped with the current product into an ‘outfit’.

3. Questions and answers

The Questions & Answers module will allow asking and answering of questions for the product selected.  The functionality contained within this module can be divided into several pieces:

* View questions
* Search for a question
* Asking a question
* Answering a question

This component will extend the ability to view and search questions, ask questions, answer questions and provide feedback on questions about the current product.

All questions will be asked and answered per product.  Specific styles will not be accounted for within the Questions & Answers module.

4. Reviews:

The Ratings & Reviews module will allow viewing and submission of reviews for the product selected.  The functionality contained within this module can be divided into several pieces

* Write new review
* Reviews List
* Sorting
* Rating Breakdown
* Product Breakdown

This component will extend the ability to write, read, and browse through reviews for the current product.
All reviews will be saved per product.  Specific styles will not be accounted for within the review module.

### Installation

* git clone from "Code" dropdown menu
* run npm install
* start webpack in watch mode by running npm run client-dev
* start the server by running npm run server-dev

### Usage - Further details on how the project is meant to be used may be helpful. For a library or framework, this section would outline how to use the library within another project (see socket.io  ). For a service that is meant to be used within a larger project architecture, instructions on how to integrate may be necessary (see node-statsD).

This project is meant for the clothing retailer Atelier (rebranded as Equinox Apparel). While the page itself contains navigation elements inside the Related Products section, but best use would be to combine this repo with a display page for all of the items--provided by Atelier. Click on the banner for a surprise!