# Cildank - Online Clothing Shop

Cildank is an online clothing store where users can purchase various types of clothing, accessories, and other fashion-related products. This project is developed using Django and React.

## Table of Contents
- [API Endpoints](#api-endpoints)
- [Overview](#overview)
- [Roles](#roles)
- [Requirements](#requirements)
- [Startup Instructions](#startup-instructions)

## API Endpoints

### For Authentication
- **Register:** [Register](https://cildank-shop-deploy-versel.vercel.app/auth/register/)
- **Login:** [Login](https://cildank-shop-deploy-versel.vercel.app/auth/login/)
- **Logout:** [Logout](https://cildank-shop-deploy-versel.vercel.app/auth/logout/)

### For Products
- **All Products:** [All Products](https://cildank-shop-deploy-versel.vercel.app/products/product/)
- **Product Pagination:** [Product Pagination](https://cildank-shop-deploy-versel.vercel.app/products/product/?page=2)
- **Sort by Price Ascending:** [Sort by Price Asc](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=asc)
- **Sort by Price Descending:** [Sort by Price Desc](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_price/?order=desc)
- **Sort by Size:** [Sort by Size](https://cildank-shop-deploy-versel.vercel.app/products/product/sorted_by_size/M/)
- **Add to Wishlist:** [Add to Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/add_product/1/)
- **Remove from Wishlist:** [Remove from Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/remove_product/1/)
- **All Wishlist Items:** [All Wishlist](https://cildank-shop-deploy-versel.vercel.app/products/wishlist/)
- **Reviews:** [Reviews](https://cildank-shop-deploy-versel.vercel.app/products/review/)

### For Purchases
- **Purchase Product:** [Purchase Product](https://cildank-shop-deploy-versel.vercel.app/purchases/list/1)

### For Transactions
- **Deposit:** [Deposit](https://cildank-shop-deploy-versel.vercel.app/transactions/deposit/)

### For Categories
- **All Categories:** [All Categories](https://cildank-shop-deploy-versel.vercel.app/categories/category_list/)
- **All Subcategories:** [All Subcategories](https://cildank-shop-deploy-versel.vercel.app/categories/subcategory_list/)

### Show Products by Category or Subcategory
- **Show Products by Subcategory:** [Show Products by Subcategory](https://cildank-shop-deploy-versel.vercel.app/category_products/?sub_category_id=3)
- **Show Products by Category:** [Show Products by Category](https://cildank-shop-deploy-versel.vercel.app/category_products/?category_id=3)

## Overview
The purpose of this project is to create a user-friendly e-commerce platform where customers can easily purchase clothing and accessories.

## Roles
This project has two types of roles:
- **Admin:** Can add, update, edit, and manage products.
- **Customer:** Can view products, register, log in and log out, purchase products, provide reviews, and view purchase lists.

## Requirements
- Python 3.x
- Django
- React
- PostgreSQL

## Startup Instructions
Follow the steps below to start the project:
1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server: `python manage.py runserver`
4. Navigate to the frontend project and use the command `npm start`.

---

