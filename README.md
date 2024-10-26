# Cildank - Online Clothing Shop

Cildank is an online clothing store where users can purchase various types of clothing, accessories, and other fashion-related products. This project is developed using Django, Django Rest Framework, HTML, CSS,Bootstrap5, and JavaScript.

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Overview](#overview)
- [Roles](#roles)
- [Requirements](#requirements)
- [Startup Instructions](#startup-instructions)

## API Endpoints

### For Authentication
- **Register:** [Register](https://cildank-shop-deploy-versel.vercel.app/auth/register/) (POST)
- **Login:** [Login](https://cildank-shop-deploy-versel.vercel.app/auth/login/) (POST)
- **Logout:** [Logout](https://cildank-shop-deploy-versel.vercel.app/auth/logout/) (POST)

### For Products
- **All Products:** [All Products](https://cildank-shop-deploy-versel.vercel.app/products/product/) (GET)
- **Product Pagination:** [Product Pagination](https://cildank-shop-deploy-versel.vercel.app/products/product/?page=2) (GET)
- **Sort by Price Ascending:** [Sort by Price Asc](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=asc) (GET)
- **Sort by Price Descending:** [Sort by Price Desc](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=desc) (GET)
- **Sort by Size:** [Sort by Size](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_size/M/) (GET)
- **Add to Wishlist:** [Add to Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/add_product/1/) (POST)
- **Remove from Wishlist:** [Remove from Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/remove_product/1/) (POST)
- **All Wishlist Items:** [All Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/) (GET)
- **Reviews:** [Reviews](https://cildank-shop-deploy-versel.vercel.app/products/review/) (GET)

### For Purchases
- **Purchase Product:** [Purchase Product](https://cildank-shop-deploy-versel.vercel.app/purchases/list/1) (GET)

### For Transactions
- **Deposit:** [Deposit](https://cildank-shop-deploy-versel.vercel.app/transactions/deposit/) (POST)

### For Categories
- **All Categories:** [All Categories](https://cildank-shop-deploy-versel.vercel.app/categories/category_list/) (GET)
- **All Subcategories:** [All Subcategories](https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/) (GET)

### Show Products by Category or Subcategory
- **Show Products by Subcategory:** [Show Products by Subcategory](https://cildank-shop-deploy-versel.vercel.app/category_products/?sub_category_id=3) (GET)
- **Show Products by Category:** [Show Products by Category](https://cildank-shop-deploy-versel.vercel.app/category_products/?category_id=3) (GET)

## Overview
The purpose of this project is to create a user-friendly e-commerce platform where customers can easily purchase clothing and accessories.

## Roles
This project has two types of roles:
- **Admin:** 
  - 🛠️ Can add, update, edit, and manage products.
  - 📝 Can register, log in, and log out.
- **Customer:**
  - 📝 Can register and confirmation by email, log in, and log out.
  - 🛍️ Can view products.
  - 📝 Can register, log in, and log out.
  - 💳 Can purchase products.
  - ⭐ Can provide reviews.
  - 📜 Can view purchase lists.

## Requirements
- Python 3.12.3
- Django 5.1
- PostgreSQL
- HTML5
- CSS3
- Bootstrap5
- JavaScript 


## Startup Instructions
Follow the steps below to start the project:
1. Clone the repository: `git clone <repository-url>`
3. Start the server: `open with live server`

---
