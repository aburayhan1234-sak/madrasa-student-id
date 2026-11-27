মাদ্রাসা স্টুডেন্ট আইডি কার্ড — QR অনলাইন সংস্করণ

এই ZIP-এর ভিতরে:
- index.html : আপনার মূল ছাত্র কার্ড তৈরির ফাইল (শুধু QR অনলাইন ব্যবস্থার জন্য প্রয়োজনীয় অংশ যোগ করা হয়েছে)
- student.html : QR স্ক্যান করলে ছাত্রের প্রকাশ্য তথ্য দেখানোর পেজ
- netlify/functions/student.mjs : নিরাপদে তথ্য সংরক্ষণ ও QR দিয়ে তথ্য পড়ার সার্ভার ফাংশন
- netlify.toml এবং package.json : Netlify deploy configuration

প্রকাশ করার নিয়ম (শুধু Netlify-তে HTML ফাইল টেনে ছেড়ে দিলেই হবে না):
1) ZIP Extract করুন।
2) ZIP Extract করে ভিতরের Student_ID_Card_Maker_QR_Online_Project ফোল্ডারের সব ফাইল ও netlify ফোল্ডার (ভেতরের ফাইলসহ) GitHub Repository-র একেবারে Root-এ আপলোড করুন। Root-এ index.html, student.html, netlify.toml, package.json এবং netlify/functions/student.mjs থাকতে হবে।
3) Netlify Dashboard > Add new project > Import an existing project > GitHub থেকে Repository নির্বাচন করে Deploy করুন।
4) Deploy হওয়ার পরে Netlify-তে Project configuration / Site configuration > Environment variables-এ যান।
5) নতুন Environment variable যোগ করুন:
   Key: STUDENT_ADMIN_TOKEN
   Value: নিজের তৈরি করা একটি দীর্ঘ, অনুমান করা কঠিন গোপন কোড (এটি কাউকে দেবেন না)।
6) Save করে নতুন Deploy চালু করুন।
7) আপনার Netlify সাইটে admin পেজ খুলে ছাত্র সংরক্ষণ করুন। প্রথমবার Admin Token চাইলে ৫ নম্বর ধাপে যে একই কোড রেখেছেন সেটি দিন।
8) আগের ছাত্রদের অনলাইনে পাঠাতে Settings-এর “সব ছাত্রের তথ্য অনলাইনে পাঠান” বাটনে চাপুন। Token চাইলে একই কোড দিন।
9) অনলাইন সিঙ্ক সফল হলে কার্ডের QR কোড স্ক্যান করে ছাত্রের তথ্য দেখা যাবে।

গুরুত্বপূর্ণ:
- QR পেজে শুধু এই তথ্য প্রকাশ হবে: মাদ্রাসার নাম, ছাত্রের নাম, পিতার নাম, ছবি, আইডি নম্বর, রোল, বিভাগ ও শিক্ষাবর্ষ।
- মোবাইল নম্বর, জন্মতারিখ, ঠিকানা বা অন্য ব্যক্তিগত তথ্য QR পেজে প্রকাশ করা হয় না।
- নতুন/সম্পাদিত ছাত্রের তথ্য লোকাল ডিভাইসে সেভ হওয়ার পর অনলাইনে পাঠানো হবে। অনলাইন সিঙ্ক ব্যর্থ হলে Settings থেকে আবার “সব ছাত্রের তথ্য অনলাইনে পাঠান” ব্যবহার করুন।
- Admin Token কোডে লেখা নেই; এটি Netlify Environment Variable-এ রাখতে হবে।
- শুধুমাত্র Drag-and-drop manual deploy করলে Netlify build চালায় না; তাই এই প্রকল্পে Functions সক্রিয় করতে GitHub-connected deploy অথবা Netlify CLI/API deploy ব্যবহার করুন।
