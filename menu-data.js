const menuData = {
  koshary: {
    title: "🥣 الكشري",
    items: [
      { name: "كشري كمالة", price: 25, img: "koshary.jpg" },
      { name: "كشري تحرير", price: 30, img: "koshary.jpg" },
      { name: "كشري نجمة", price: 35, img: "koshary.jpg" },
      { name: "كشري سوبر نجمة ", price: 40, img: "koshary.jpg" },
      { name: "كشري سوبر تحرير", price: 50, img: "koshary.jpg" },
      { name: "كشري أبو المجد", price: 60, img: "koshary.jpg" },
      { name: "كشري سوبر أبو المجد", price: 70, img: "koshary.jpg" },
    ],
  },
  "koshary-liver": {
    title: "🥩 كشري بالكبدة",
    items: [
      { name: "تحرير كبدة ", price: 55, img: "/koshary_kebda.jpg" },
      { name: "نجمة كبدة", price: 65, img: "/koshary_kebda.jpg" },
      { name: "سوبر تحرير كبدة", price: 80, img: "/koshary_kebda.jpg" },
      { name: "أبو المجد كبدة", price: 90, img: "/koshary_kebda.jpg" },
    ],
  },
  tagines: {
    title: "🥘 الطواجن",
    items: [
      { name: "طاجن لحمة", price: 40, img: "/tagen-lahma.jpg" },
      { name: "طاجن فراخ", price: 45, img: "/tagen-frakh.jpg" },
      { name: "طاجن كبدة", price: 45, img: "/tagen-kebda.jpg" },
      { name: "اسباكتي لحمة", price: 55, img: "/tagen-lahma.jpg" },
      { name: "اسباكتي فراخ", price: 55, img: "/tagen-frakh.jpg" },
      { name: "اسباكتي كبدة", price: 55, img: "/tagen-kebda.jpg" },
    ],
  },
  "mozzarella-tagines": {
    title: "🧀 طواجن بالموتزاريلات",
    items: [
      { name: "طاجن لحمة موتزاريلا", price: 60, img: "/tagen_motzrila.jpg" },
      { name: "طاجن فراخ موتزاريلا ", price: 65, img: "/tagen_motzrila.jpg" },
      { name: "طاجن كبدة موتزاريلا ", price: 65, img: "/tagen_motzrila.jpg" },
    ],
  },
  hawawshi: {
    title: "🥪 الحواوشي",
    items: [
      { name: "حواوشي لحمة (صغير)", price: 45, img: "/hwawshi2.jpg" },
      { name: "حواوشي لحمة (وسط)", price: 55, img: "/hwawshi2.jpg" },
      { name: "حواوشي لحمة (كبير)", price: 65, img: "/hwawshi2.jpg" },
      { name: "حواوشي فراخ (صغير)", price: 55, img: "/hwawshi2.jpg" },
      { name: "حواوشي فراخ (وسط)", price: 65, img: "/hwawshi2.jpg" },
      { name: "حواوشي فراخ (كبير)", price: 75, img: "/hwawshi2.jpg" },
      { name: "حواوشي مكس (صغير)", price: 75, img: "/hwawshi2.jpg" },
      { name: "حواوشي مكس (وسط)", price: 85, img: "/hwawshi2.jpg" },
      { name: "حواوشي مكس (كبير)", price: 95, img: "/hwawshi2.jpg" },
    ],
  },
  pizza: {
    title: "🍕 البيتزا",
    items: [
      { name: "بيتزا لحمة (صغير)", price: 75, img: "/pizza.jpg" },
      { name: "بيتزا لحمة (وسط)", price: 85, img: "/pizza.jpg" },
      { name: "بيتزا لحمة (كبير)", price: 95, img: "/pizza.jpg" },
      { name: "بيتزا فراخ (صغير)", price: 85, img: "/pizza.jpg" },
      { name: "بيتزا فراخ (وسط)", price: 95, img: "/pizza.jpg" },
      { name: "بيتزا فراخ (كبير)", price: 105, img: "/pizza.jpg" },
      { name: "بيتزا جبنة (صغير)", price: 75, img: "/pizza.jpg" },
      { name: "بيتزا جبنة (وسط)", price: 85, img: "/pizza.jpg" },
      { name: "بيتزا جبنة (كبير)", price: 95, img: "/pizza.jpg" },
      { name: "بيتزا مكس (صغير)", price: 95, img: "/pizza.jpg" },
      { name: "بيتزا مكس (وسط)", price: 105, img: "/pizza.jpg" },
      { name: "بيتزا مكس (كبير)", price: 125, img: "/pizza.jpg" },
    ],
  },
  dessert: {
    title: "🍰 الحلو",
    items: [
      { name: "مهلبية", price: 15, img: "/ارز-بلبن.jfif" },
      { name: "أرز باللبن عادي", price: 18, img: "/ارز-بلبن.jfif" },
      { name: "أرز باللبن فرن", price: 20, img: "/ارز-بلبن-فرن.jfif" },
    ],
  },
  extras: {
    title: "✨ الزيادات",
    items: [
      { name: "عيش", price: 12, img: "/aish.jfif" },
      { name: "عدس", price: 10, img: "/عدس.jpg" },
      { name: "تقلية", price: 10, img: "/ta2lya.jpg" },
      { name: "حمص", price: 10, img: "/homos.jpg" },
      { name: "دقة", price: 8, img: "/دقه.jpg" },
      { name: "شطة", price: 8, img: "/شطه.jfif" },
      { name: "صلصه", price: 8, img: "/صلصه.jpg" },
      { name: "مخلل", price: 8, img: "/مخللات_مشكلة.jpg" },
    ],
  },
  extra: {
    title: "✨ اضافات",
    items: [
      { name: "اضافه كبده", price: 30, img: "/الكبدة_الإسكندراني.jpg" },
      { name: "اضافه فراخ", price: 30, img: "/فراخ.jpg" },
      { name: "اضافه لحمه", price: 30, img: "/لحمه.jfif" },
    ],
  },
};
