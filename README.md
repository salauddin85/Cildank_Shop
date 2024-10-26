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
- **Register:** `POST https://cildank-shop-deploy-versel.vercel.app/auth/register/`
- **Login:** `POST https://cildank-shop-deploy-versel.vercel.app/auth/login/`
- **Logout:** `POST https://cildank-shop-deploy-versel.vercel.app/auth/logout/`

### For Products
- **All Products:** `GET https://cildank-shop-deploy-versel.vercel.app/products/product/`
- **Product Pagination:** `GET https://cildank-shop-deploy-versel.vercel.app/products/product/?page=2`
- **Sort by Price Ascending:** `GET https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=asc`
- **Sort by Price Descending:** `GET https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=desc`
- **Sort by Size:** `GET https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_size/M/`
- **Add to Wishlist:** `POST https://cildank-shop-deploy-versel.vercel.app/products/wishlist/add_product/1/`
- **Remove from Wishlist:** `POST https://cildank-shop-deploy-versel.vercel.app/products/wishlist/remove_product/1/`
- **All Wishlist Items:** `GET https://cildank-shop-deploy-versel.vercel.app/products/wishlist/`
- **Reviews:** `GET https://cildank-shop-deploy-versel.vercel.app/products/review/`

### For Purchases
- **Purchase Product:** `GET https://cildank-shop-deploy-versel.vercel.app/purchases/list/1`

### For Transactions
- **Deposit:** `POST https://cildank-shop-deploy-versel.vercel.app/transactions/deposit/`

### For Categories
- **All Categories:** `GET https://cildank-shop-deploy-versel.vercel.app/categories/category_list/`
- **All Subcategories:** `GET https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/`

### Show Products by Category or Subcategory
- **Show Products by Subcategory:** `GET https://cildank-shop-deploy-versel.vercel.app/category_products/?sub_category_id=3`
- **Show Products by Category:** `GET https://cildank-shop-deploy-versel.vercel.app/category_products/?category_id=3`

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
