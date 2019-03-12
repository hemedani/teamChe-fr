import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer>
    <div className="learn-more">
      <h3>بیشتر بدانید</h3>
        <div>پین‌طب سرویس معرفی مراکز طب سنتی است که با استفاده از آن می­­توانید از عطاری ها، فروشندگان محصولات ارگانیک ، مطب ها، سلامتکده ها، رستوران هایی که غذای سالم سرو می­کنند و یا حتی خرده فروش های اطراف خودتان مطلع بشوید.
با استفاده از پین‌طب می­توانید از محصولات عطاری ها، ساعات کاری مطب ها، آدرس سلامتکده ها و اطلاعات تماس و مکان خرده فروش ها آگاه بشوید و نظرات کاربران را در مورد این مراکز بخوانید و تجربیات خود را با سایر کاربران در میان بگذارید.
        </div>
    </div>
    <div className="links">
      <h3>پیوندها</h3>
      <Link to='/about-us' className='links-link'>درباره ما</Link>
      <Link to='/contact-us' className='links-link'>تماس با ما</Link>
      {/* <Link to='/centers' className='links-link'>سئوالات متداول</Link> */}
      <a href='http://blog.pinteb.ir/' target='_blank' className='links-link'>وبلاگ</a>
      <Link to='/centers' className='links-link'>مراکز</Link>
    </div>
    <div className="knowledge">
      <h3>آموزش</h3>
      <a href='http://blog.pinteb.ir/1397/01/21/%D8%B1%D8%A7%D9%87-%D9%87%D8%A7%DB%8C-%D8%AA%D8%B4%D8%AE%DB%8C%D8%B5-%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86-%D8%A7%D8%B5%D9%84/' target='_blank' className='links-link'>راه های تشخیص زعفران اصل</a>
      <a href='http://blog.pinteb.ir/1397/01/22/%D8%B1%D9%81%D8%B9-%D8%AE%D8%B3%D8%AA%DA%AF%DB%8C-%D8%AF%D8%B1-%D8%B7%D8%A8-%D8%B3%D9%86%D8%AA%DB%8C/' target='_blank' className='links-link'>رفع خستگی در طب سنتی</a>
      <a href='http://blog.pinteb.ir/1397/01/07/%D8%B1%D9%88%D8%B4-%D9%87%D8%A7%DB%8C-%D8%AA%D8%B4%D8%AE%DB%8C%D8%B5-%D8%B9%D8%B3%D9%84-%D8%B7%D8%A8%DB%8C%D8%B9%DB%8C/' target='_blank' className='links-link'>روش های تشخیص عسل طبیعی</a>
      <a href='http://blog.pinteb.ir/1397/01/21/%D8%A2%D8%B4%D9%86%D8%A7%DB%8C%DB%8C-%D8%A8%D8%A7-%DA%AF%DB%8C%D8%A7%D9%87-%D8%AF%D8%A7%D8%B1%D9%88%DB%8C%DB%8C-%D8%A2%D9%88%DB%8C%D8%B4%D9%86-%D8%B4%DB%8C%D8%B1%D8%A7%D8%B2%DB%8C/' target='_blank' className='links-link'>آشنایی با گیاه دارویی آویشن شیرازی</a>
      <a href='http://blog.pinteb.ir/1397/01/22/%D8%AE%D9%88%D8%A7%D8%B5-%D8%B4%DA%AF%D9%81%D8%AA-%D8%A7%D9%86%DA%AF%DB%8C%D8%B2-%D8%B9%D8%B1%D9%82-%D8%A8%D9%87%D8%A7%D8%B1-%D9%86%D8%A7%D8%B1%D9%86%D8%AC/' target='_blank' className='links-link'>خواص شگفت‌انگیز عرق بهارنارنج</a>
      <a href='http://blog.pinteb.ir/1397/01/27/%DA%AF%D9%84%D9%BE%D8%B1%D8%9B-%D8%AA%D9%82%D9%88%DB%8C%D8%AA-%DA%A9%D9%86%D9%86%D8%AF%D9%87-%D9%85%D8%B9%D8%AF%D9%87/' target='_blank' className='links-link'>گلپر؛ تقویت کننده معده</a>
    </div>
  </footer>
  )

  export default Footer
