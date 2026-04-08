/**
 * Internationalization (i18n) System for Inch to CM Converter
 * Supports: English (default), Chinese, Japanese, Spanish, French, German
 */

const i18n = {
    currentLang: 'en',
    
    languages: {
        en: { name: 'English', flag: '🇺🇸' },
        zh: { name: '中文', flag: '🇨🇳' },
        ja: { name: '日本語', flag: '🇯🇵' },
        es: { name: 'Español', flag: '🇪🇸' },
        fr: { name: 'Français', flag: '🇫🇷' },
        de: { name: 'Deutsch', flag: '🇩🇪' }
    },
    
    translations: {
        en: {
            // Header
            title: "Inch to CM Converter",
            subtitle: "Convert between inches and centimeters instantly with our accurate and easy-to-use conversion tool",
            
            // Converter
            inches_to_cm: "Inches to Centimeters",
            cm_to_inches: "Centimeters to Inches",
            enter_inches: "Enter Inches:",
            enter_cm: "Enter Centimeters:",
            enter_inches_placeholder: "Enter inches",
            enter_cm_placeholder: "Enter centimeters",
            
            // Table
            common_conversions: "Common Conversions Reference",
            table_inches: "Inches",
            table_cm: "Centimeters",
            
            // About
            about_title: "About This Conversion Tool",
            about_learn: "Learn how to use this tool effectively",
            about_guide: "with our comprehensive guide.",
            demo_notice: "Demo values showing: 10 inches = 25.4 centimeters",

            // Breadcrumb
            breadcrumb_current: "Inch to CM Converter",

            // FAQ
            faq_title: "Frequently Asked Questions",
            faq_q1: "What is the formula for converting inches to centimeters?",
            faq_a1: "To convert inches to centimeters, multiply the inch value by 2.54. The formula is: cm = inches × 2.54. For example, 1 inch = 2.54 cm, 10 inches = 25.4 cm.",
            faq_q2: "How accurate is this inch to cm converter?",
            faq_a2: "This converter uses the exact conversion factor of 2.54 cm per inch, which is the internationally agreed standard. All calculations are accurate to two decimal places.",
            faq_q3: "Can I convert decimal inches to centimeters?",
            faq_a3: "Yes, this converter supports decimal values. You can enter values like 1.5, 2.25, or 3.75 inches, and the converter will calculate the exact centimeter equivalent.",
            faq_q4: "How many centimeters are in 1 inch?",
            faq_a4: "1 inch equals exactly 2.54 centimeters. This conversion is based on the international yard definition established in 1959.",
            faq_q5: "Why do I need an inch to cm converter?",
            faq_a5: "Different countries use different measurement systems. The United States uses inches, while most other countries use centimeters. A converter helps you quickly translate measurements for cooking, DIY projects, shopping, and more.",
            faq_q6: "What is the difference between inches and centimeters?",
            faq_a6: "Inches are part of the Imperial measurement system used primarily in the United States and United Kingdom. Centimeters are part of the Metric system used worldwide. 1 inch = 2.54 cm exactly.",
            faq_q7: "How do I convert centimeters to inches?",
            faq_a7: "To convert centimeters to inches, divide the centimeter value by 2.54. The formula is: inches = cm ÷ 2.54. For example, 10 cm ≈ 3.94 inches.",
            faq_q8: "What are common uses for inch to cm conversion?",
            faq_a8: "Common uses include: measuring TV and monitor screen sizes, converting clothing measurements, DIY and woodworking projects, cooking recipes with imperial measurements, and understanding product dimensions from international sellers.",
            faq_q9: "Is this converter free to use?",
            faq_a9: "Yes, this inch to cm converter is completely free to use with no registration required. It works on all devices - desktop, tablet, and mobile.",
            faq_q10: "Can I use this converter offline?",
            faq_a10: "Once the page loads, the converter works entirely offline in your browser. No internet connection is needed to perform conversions after the initial page load.",

            // Formula
            formula_title: "Conversion Formula",
            formula_in_to_cm: "1 inch = 2.54 centimeters",
            formula_cm_to_in: "1 centimeter = 0.393701 inches",
            
            // Quick Reference
            quick_ref_title: "Quick Reference",
            quick_ref_1: "1/4 inch = 0.635 cm",
            quick_ref_2: "1/2 inch = 1.27 cm",
            quick_ref_3: "3/4 inch = 1.905 cm",
            quick_ref_4: "1 inch = 2.54 cm",
            quick_ref_5: "2 inches = 5.08 cm",
            quick_ref_6: "6 inches = 15.24 cm",
            quick_ref_7: "12 inches (1 foot) = 30.48 cm",
            
            // Footer
            footer_copyright: "© 2026 inch-to-cm.online - Free Online Length Conversion Tool",
            footer_tagline: "Accurate inch to cm and cm to inch conversions made simple",
            footer_partners_label: "Partners:",
            footer_partners: "Partners: OC-Role | OpenClaw101 | iTool",

            // Meta
            meta_title: "Inch to CM Converter - Free Online Length Conversion Tool",
            meta_description: "Convert inches to centimeters and centimeters to inches instantly. Accurate, fast, and easy-to-use length conversion tool.",
            meta_keywords: "inch to cm, cm to inch, inches to centimeters, centimeters to inches, length converter, measurement converter"
        },
        
        zh: {
            title: "英寸转厘米转换器",
            subtitle: "使用我们准确易用的转换工具，即时在英寸和厘米之间进行转换",
            
            inches_to_cm: "英寸转厘米",
            cm_to_inches: "厘米转英寸",
            enter_inches: "输入英寸：",
            enter_cm: "输入厘米：",
            enter_inches_placeholder: "输入英寸",
            enter_cm_placeholder: "输入厘米",
            
            common_conversions: "常用转换参考",
            table_inches: "英寸",
            table_cm: "厘米",
            
            about_title: "关于此转换工具",
            about_learn: "了解如何有效使用此工具",
            about_guide: "查看我们的综合指南。",
            demo_notice: "演示值：10英寸 = 25.4厘米",

            // Breadcrumb
            breadcrumb_current: "英寸转厘米转换器",

            // FAQ
            faq_title: "常见问题",
            faq_q1: "英寸转厘米的公式是什么？",
            faq_a1: "要将英寸转换为厘米，请将英寸数值乘以2.54。公式为：厘米 = 英寸 × 2.54。例如：1英寸 = 2.54厘米，10英寸 = 25.4厘米。",
            faq_q2: "此英寸厘米转换器有多准确？",
            faq_a2: "此转换器使用精确的换算系数每英寸2.54厘米，这是国际公认的标准。所有计算结果精确到小数点后两位。",
            faq_q3: "我可以转换小数英寸到厘米吗？",
            faq_a3: "是的，此转换器支持小数值。您可以输入1.5、2.25或3.75英寸等数值，转换器将计算出精确的厘米等值。",
            faq_q4: "1英寸等于多少厘米？",
            faq_a4: "1英寸精确等于2.54厘米。此换算基于1959年确立的国际码定义。",
            faq_q5: "为什么我需要英寸厘米转换器？",
            faq_a5: "不同国家使用不同的计量系统。美国使用英寸，而大多数其他国家使用厘米。转换器可以帮助您快速转换烹饪、DIY项目、购物等场景中的测量数据。",
            faq_q6: "英寸和厘米有什么区别？",
            faq_a6: "英寸是英制计量系统的一部分，主要在美国和英国使用。厘米是公制系统的一部分，在全球范围内使用。1英寸 = 2.54厘米。",
            faq_q7: "如何将厘米转换为英寸？",
            faq_a7: "要将厘米转换为英寸，请将厘米数值除以2.54。公式为：英寸 = 厘米 ÷ 2.54。例如：10厘米 ≈ 3.94英寸。",
            faq_q8: "英寸厘米转换的常见用途是什么？",
            faq_a8: "常见用途包括：测量电视和显示器屏幕尺寸、转换服装尺寸、DIY和木工项目、使用英制计量的烹饪食谱，以及了解国际卖家的产品尺寸。",
            faq_q9: "此转换器免费使用吗？",
            faq_a9: "是的，此英寸厘米转换器完全免费使用，无需注册。适用于所有设备——桌面、平板和手机。",
            faq_q10: "我可以离线使用此转换器吗？",
            faq_a10: "页面加载完成后，转换器可以在浏览器中完全离线工作。初始页面加载后，执行转换不需要互联网连接。",

            formula_title: "转换公式",
            formula_in_to_cm: "1英寸 = 2.54厘米",
            formula_cm_to_in: "1厘米 = 0.393701英寸",
            
            quick_ref_title: "快速参考",
            quick_ref_1: "1/4英寸 = 0.635厘米",
            quick_ref_2: "1/2英寸 = 1.27厘米",
            quick_ref_3: "3/4英寸 = 1.905厘米",
            quick_ref_4: "1英寸 = 2.54厘米",
            quick_ref_5: "2英寸 = 5.08厘米",
            quick_ref_6: "6英寸 = 15.24厘米",
            quick_ref_7: "12英寸（1英尺）= 30.48厘米",
            
            footer_copyright: "© 2026 inch-to-cm.online - 免费在线长度转换工具",
            footer_tagline: "简单准确的英寸厘米互换转换",
            footer_partners_label: "合作伙伴:",
            footer_partners: "合作伙伴: OC-Role | OpenClaw101 | iTool",
            
            meta_title: "英寸转厘米转换器 - 免费在线长度转换工具",
            meta_description: "即时将英寸转换为厘米，或将厘米转换为英寸。准确、快速、易用的长度转换工具。",
            meta_keywords: "英寸转厘米, 厘米转英寸, 长度转换器, 测量转换"
        },
        
        ja: {
            title: "インチからセンチメートル変換",
            subtitle: "正確で使いやすい変換ツールで、インチとセンチメートルを即座に変換",
            
            inches_to_cm: "インチからセンチメートル",
            cm_to_inches: "センチメートルからインチ",
            enter_inches: "インチを入力：",
            enter_cm: "センチメートルを入力：",
            enter_inches_placeholder: "インチを入力",
            enter_cm_placeholder: "センチメートルを入力",
            
            common_conversions: "一般的な変換参照",
            table_inches: "インチ",
            table_cm: "センチメートル",
            
            about_title: "この変換ツールについて",
            about_learn: "このツールを効果的に使用する方法を学ぶ",
            about_guide: "総合ガイドをご覧ください。",
            demo_notice: "デモ値：10インチ = 25.4センチメートル",

            // Breadcrumb
            breadcrumb_current: "インチからセンチメートル変換",

            // FAQ
            faq_title: "よくある質問",
            faq_q1: "インチをセンチメートルに変換する式は？",
            faq_a1: "インチをセンチメートルに変換するには、インチの値を2.54で掛けます。式は：cm = インチ × 2.54です。例えば、1インチ = 2.54 cm、10インチ = 25.4 cm。",
            faq_q2: "このインチからセンチメートル変換器はどのくらい正確ですか？",
            faq_a2: "この変換器は、1インチあたり2.54センチメートルという正確な換算係数を使用しています。これは国際的に合意された標準です。すべての計算結果は小数点以下2桁まで正確です。",
            faq_q3: "小数のインチをセンチメートルに変換できますか？",
            faq_a3: "はい、この変換器は小数値をサポートしています。1.5、2.25、3.75インチなどの値を入力でき、変換器が正確なセンチメートル等価を計算します。",
            faq_q4: "1インチは何センチメートルですか？",
            faq_a4: "1インチは正確に2.54センチメートルに等しいです。この換算は1959年に確立された国際ヤードの定義に基づいています。",
            faq_q5: "なぜインチからセンチメートル変換器が必要ですか？",
            faq_a5: "国によって使用される測定システムが異なります。アメリカはインチを使用し、他の多くの国はセンチメートルを使用します。変換器は、料理、DIYプロジェクト、ショッピングなどのシーンで測定データを素早く変換するのに役立ちます。",
            faq_q6: "インチとセンチメートルの違いは何ですか？",
            faq_a6: "インチは、主にアメリカとイギリスで使用されるヤード・ポンド法測定システムの一部です。センチメートルは世界中で使用されるメートル法システムの一部です。1インチ = 2.54センチメートルです。",
            faq_q7: "センチメートルをインチに変換するにはどうすればよいですか？",
            faq_a7: "センチメートルをインチに変換するには、センチメートルの値を2.54で割ります。式は：インチ = cm ÷ 2.54です。例えば、10 cm ≈ 3.94インチです。",
            faq_q8: "インチからセンチメートル変換の一般的な用途は何ですか？",
            faq_a8: "一般的な用途には次のものがあります：テレビやモニターの画面サイズの測定、服のサイズの変換、DIYや木工プロジェクト、ヤード・ポンド法の測定を使用した料理レシピ、および国際的な販売者の商品寸法の理解。",
            faq_q9: "この変換器は無料で使用できますか？",
            faq_a9: "はい、このインチからセンチメートル変換器は完全に無料で使用でき、登録は不要です。デスクトップ、タブレット、モバイルなどすべてのデバイスで動作します。",
            faq_q10: "この変換器をオフラインで使用できますか？",
            faq_a10: "ページが読み込まれると、変換器はブラウザで完全にオフラインで動作します。初期ページの読み込み後、変換を実行するためにインターネット接続は不要です。",

            formula_title: "変換式",
            formula_in_to_cm: "1インチ = 2.54センチメートル",
            formula_cm_to_in: "1センチメートル = 0.393701インチ",
            
            quick_ref_title: "クイックリファレンス",
            quick_ref_1: "1/4インチ = 0.635cm",
            quick_ref_2: "1/2インチ = 1.27cm",
            quick_ref_3: "3/4インチ = 1.905cm",
            quick_ref_4: "1インチ = 2.54cm",
            quick_ref_5: "2インチ = 5.08cm",
            quick_ref_6: "6インチ = 15.24cm",
            quick_ref_7: "12インチ（1フィート）= 30.48cm",
            
            footer_copyright: "© 2026 inch-to-cm.online - 無料オンライン長さ変換ツール",
            footer_tagline: "シンプルで正確なインチ・センチ変換",
            footer_partners_label: "パートナー:",
            footer_partners: "パートナー: OC-Role | OpenClaw101 | iTool",
            
            meta_title: "インチからセンチ変換 - 無料オンライン長さ変換ツール",
            meta_description: "インチをセンチメートルに、センチメートルをインチに即座に変換。正確、高速、使いやすい長さ変換ツール。",
            meta_keywords: "インチからセンチ, センチからインチ, 長さ変換, 測定変換"
        },
        
        es: {
            title: "Convertidor de Pulgadas a CM",
            subtitle: "Convierte entre pulgadas y centímetros instantáneamente con nuestra herramienta precisa y fácil de usar",
            
            inches_to_cm: "Pulgadas a Centímetros",
            cm_to_inches: "Centímetros a Pulgadas",
            enter_inches: "Ingresa Pulgadas:",
            enter_cm: "Ingresa Centímetros:",
            enter_inches_placeholder: "Ingresa pulgadas",
            enter_cm_placeholder: "Ingresa centímetros",
            
            common_conversions: "Referencia de Conversiones Comunes",
            table_inches: "Pulgadas",
            table_cm: "Centímetros",
            
            about_title: "Acerca de Esta Herramienta de Conversión",
            about_learn: "Aprende a usar esta herramienta eficazmente",
            about_guide: "con nuestra guía completa.",
            demo_notice: "Valores de demostración: 10 pulgadas = 25.4 centímetros",

            // Breadcrumb
            breadcrumb_current: "Convertidor de Pulgadas a CM",

            // FAQ
            faq_title: "Preguntas Frecuentes",
            faq_q1: "¿Cuál es la fórmula para convertir pulgadas a centímetros?",
            faq_a1: "Para convertir pulgadas a centímetros, multiplica el valor en pulgadas por 2.54. La fórmula es: cm = pulgadas × 2.54. Por ejemplo, 1 pulgada = 2.54 cm, 10 pulgadas = 25.4 cm.",
            faq_q2: "¿Qué tan preciso es este convertidor de pulgadas a cm?",
            faq_a2: "Este convertidor utiliza el factor de conversión exacto de 2.54 cm por pulgada, que es el estándar internacionalmente acordado. Todos los cálculos son precisos a dos decimales.",
            faq_q3: "¿Puedo convertir pulgadas decimales a centímetros?",
            faq_a3: "Sí, este convertidor soporta valores decimales. Puede ingresar valores como 1.5, 2.25 o 3.75 pulgadas, y el convertidor calculará el equivalente exacto en centímetros.",
            faq_q4: "¿Cuántos centímetros hay en 1 pulgada?",
            faq_a4: "1 pulgada equivale exactamente a 2.54 centímetros. Esta conversión se basa en la definición internacional de yarda establecida en 1959.",
            faq_q5: "¿Por qué necesito un convertidor de pulgadas a cm?",
            faq_a5: "Diferentes países usan diferentes sistemas de medición. Estados Unidos usa pulgadas, mientras que la mayoría de otros países usan centímetros. Un convertidor le ayuda a traducir rápidamente mediciones para cocina, proyectos DIY, compras y más.",
            faq_q6: "¿Cuál es la diferencia entre pulgadas y centímetros?",
            faq_a6: "Las pulgadas son parte del sistema de medición Imperial usado principalmente en Estados Unidos y Reino Unido. Los centímetros son parte del sistema Métrico usado mundialmente. 1 pulgada = 2.54 cm exactamente.",
            faq_q7: "¿Cómo convierto centímetros a pulgadas?",
            faq_a7: "Para convertir centímetros a pulgadas, divide el valor en centímetros por 2.54. La fórmula es: pulgadas = cm ÷ 2.54. Por ejemplo, 10 cm ≈ 3.94 pulgadas.",
            faq_q8: "¿Cuáles son los usos comunes para la conversión de pulgadas a cm?",
            faq_a8: "Usos comunes incluyen: medir tamaños de pantallas de TV y monitores, convertir medidas de ropa, proyectos de carpintería y bricolaje, recetas de cocina con mediciones imperiales, y entender dimensiones de productos de vendedores internacionales.",
            faq_q9: "¿Este convertidor es gratuito de usar?",
            faq_a9: "Sí, este convertidor de pulgadas a cm es completamente gratuito de usar sin registro requerido. Funciona en todos los dispositivos - escritorio, tablet y móvil.",
            faq_q10: "¿Puedo usar este convertidor sin conexión a internet?",
            faq_a10: "Una vez que la página carga, el convertidor funciona completamente sin conexión en su navegador. No se necesita conexión a internet para realizar conversiones después de la carga inicial de la página.",

            formula_title: "Fórmula de Conversión",
            formula_in_to_cm: "1 pulgada = 2.54 centímetros",
            formula_cm_to_in: "1 centímetro = 0.393701 pulgadas",
            
            quick_ref_title: "Referencia Rápida",
            quick_ref_1: "1/4 pulgada = 0.635 cm",
            quick_ref_2: "1/2 pulgada = 1.27 cm",
            quick_ref_3: "3/4 pulgada = 1.905 cm",
            quick_ref_4: "1 pulgada = 2.54 cm",
            quick_ref_5: "2 pulgadas = 5.08 cm",
            quick_ref_6: "6 pulgadas = 15.24 cm",
            quick_ref_7: "12 pulgadas (1 pie) = 30.48 cm",
            
            footer_copyright: "© 2026 inch-to-cm.online - Herramienta Gratuita de Conversión de Longitud",
            footer_tagline: "Conversiones precisas de pulgadas a cm y de cm a pulgadas de forma sencilla",
            footer_partners_label: "Socios:",
            footer_partners: "Socios: OC-Role | OpenClaw101 | iTool",
            
            meta_title: "Convertidor de Pulgadas a CM - Herramienta Gratuita de Conversión",
            meta_description: "Convierte pulgadas a centímetros y centímetros a pulgadas instantáneamente. Herramienta de conversión precisa, rápida y fácil de usar.",
            meta_keywords: "pulgadas a cm, cm a pulgadas, convertidor de longitud, conversión de medidas"
        },
        
        fr: {
            title: "Convertisseur Pouce en CM",
            subtitle: "Convertissez instantanément entre pouces et centimètres avec notre outil précis et facile à utiliser",
            
            inches_to_cm: "Pouces en Centimètres",
            cm_to_inches: "Centimètres en Pouces",
            enter_inches: "Entrez les Pouces:",
            enter_cm: "Entrez les Centimètres:",
            enter_inches_placeholder: "Entrez les pouces",
            enter_cm_placeholder: "Entrez les centimètres",
            
            common_conversions: "Référence des Conversions Courantes",
            table_inches: "Pouces",
            table_cm: "Centimètres",
            
            about_title: "À Propos de Cet Outil de Conversion",
            about_learn: "Apprenez à utiliser cet outil efficacement",
            about_guide: "avec notre guide complet.",
            demo_notice: "Valeurs de démonstration: 10 pouces = 25.4 centimètres",

            // Breadcrumb
            breadcrumb_current: "Convertisseur Pouce en CM",

            // FAQ
            faq_title: "Questions Fréquentes",
            faq_q1: "Quelle est la formule pour convertir les pouces en centimètres?",
            faq_a1: "Pour convertir les pouces en centimètres, multipliez la valeur en pouces par 2,54. La formule est : cm = pouces × 2,54. Par exemple, 1 pouce = 2,54 cm, 10 pouces = 25,4 cm.",
            faq_q2: "Quelle est la précision de ce convertisseur pouces en cm?",
            faq_a2: "Ce convertisseur utilise le facteur de conversion exact de 2,54 cm par pouce, qui est le standard internationallement convenu. Tous les calculs sont précis à deux décimales près.",
            faq_q3: "Puis-je convertir des pouces décimales en centimètres?",
            faq_a3: "Oui, ce convertisseur prend en charge les valeurs décimales. Vous pouvez entrer des valeurs comme 1,5, 2,25 ou 3,75 pouces, et le convertisseur calculera l'équivalent exact en centimètres.",
            faq_q4: "Combien de centimètres font 1 pouce?",
            faq_a4: "1 pouce équivaut exactement à 2,54 centimètres. Cette conversion est basée sur la définition internationale de la yard établie en 1959.",
            faq_q5: "Pourquoi ai-je besoin d'un convertisseur pouces en cm?",
            faq_a5: "Différents pays utilisent différents systèmes de mesure. Les États-Unis utilisent les pouces, tandis que la plupart des autres pays utilisent les centimètres. Un convertisseur vous aide à traduire rapidement les mesures pour la cuisine, les projets DIY, les achats et plus.",
            faq_q6: "Quelle est la différence entre pouces et centimètres?",
            faq_a6: "Les pouces font partie du système de mesure Impérial utilisé principalement aux États-Unis et au Royaume-Uni. Les centimètres font partie du système Métrique utilisé dans le monde entier. 1 pouce = 2,54 cm exactement.",
            faq_q7: "Comment convertir les centimètres en pouces?",
            faq_a7: "Pour convertir les centimètres en pouces, divisez la valeur en centimètres par 2,54. La formule est : pouces = cm ÷ 2,54. Par exemple, 10 cm ≈ 3,94 pouces.",
            faq_q8: "Quels sont les usages courants pour la conversion pouces en cm?",
            faq_a8: "Les usages courants incluent : mesurer les tailles d'écran de TV et de moniteurs, convertir les mesures de vêtements, les projets de menuiserie et de bricolage, les recettes de cuisine avec des mesures impériales, et comprendre les dimensions de produits de vendeurs internationaux.",
            faq_q9: "Ce convertisseur est-il gratuit à utiliser?",
            faq_a9: "Oui, ce convertisseur pouces en cm est entièrement gratuit à utiliser sans inscription requise. Il fonctionne sur tous les appareils - ordinateur, tablette et mobile.",
            faq_q10: "Puis-je utiliser ce convertisseur hors ligne?",
            faq_a10: "Une fois que la page est chargée, le convertisseur fonctionne entièrement hors connexion dans votre navigateur. Aucune connexion internet n'est nécessaire pour effectuer les conversions après le chargement initial de la page.",

            formula_title: "Formule de Conversion",
            formula_in_to_cm: "1 pouce = 2.54 centimètres",
            formula_cm_to_in: "1 centimètre = 0.393701 pouces",
            
            quick_ref_title: "Référence Rapide",
            quick_ref_1: "1/4 pouce = 0.635 cm",
            quick_ref_2: "1/2 pouce = 1.27 cm",
            quick_ref_3: "3/4 pouce = 1.905 cm",
            quick_ref_4: "1 pouce = 2.54 cm",
            quick_ref_5: "2 pouces = 5.08 cm",
            quick_ref_6: "6 pouces = 15.24 cm",
            quick_ref_7: "12 pouces (1 pied) = 30.48 cm",
            
            footer_copyright: "© 2026 inch-to-cm.online - Outil Gratuit de Conversion de Longueur",
            footer_tagline: "Conversions précises pouces en cm et cm en pouces simplifiées",
            footer_partners_label: "Partenaires:",
            footer_partners: "Partenaires: OC-Role | OpenClaw101 | iTool",
            
            meta_title: "Convertisseur Pouce en CM - Outil Gratuit de Conversion",
            meta_description: "Convertissez les pouces en centimètres et vice versa instantanément. Outil de conversion précis, rapide et facile à utiliser.",
            meta_keywords: "pouce en cm, cm en pouce, convertisseur de longueur, conversion de mesure"
        },
        
        de: {
            title: "Zoll zu CM Umrechner",
            subtitle: "Konvertieren Sie sofort zwischen Zoll und Zentimetern mit unserem präzisen und benutzerfreundlichen Tool",
            
            inches_to_cm: "Zoll in Zentimeter",
            cm_to_inches: "Zentimeter in Zoll",
            enter_inches: "Zoll eingeben:",
            enter_cm: "Zentimeter eingeben:",
            enter_inches_placeholder: "Zoll eingeben",
            enter_cm_placeholder: "Zentimeter eingeben",
            
            common_conversions: "Häufige Umrechnungen Referenz",
            table_inches: "Zoll",
            table_cm: "Zentimeter",
            
            about_title: "Über dieses Umrechnungstool",
            about_learn: "Erfahren Sie, wie Sie dieses Tool effektiv nutzen",
            about_guide: "mit unserem umfassenden Leitfaden.",
            demo_notice: "Demowerte: 10 Zoll = 25.4 Zentimeter",

            // Breadcrumb
            breadcrumb_current: "Zoll zu CM Umrechner",

            // FAQ
            faq_title: "Häufig gestellte Fragen",
            faq_q1: "Was ist die Formel zur Umrechnung von Zoll in Zentimeter?",
            faq_a1: "Um Zoll in Zentimeter umzurechnen, multiplizieren Sie den Zollwert mit 2,54. Die Formel lautet: cm = Zoll × 2,54. Zum Beispiel: 1 Zoll = 2,54 cm, 10 Zoll = 25,4 cm.",
            faq_q2: "Wie genau ist dieser Zoll-in-Zentimeter-Umrechner?",
            faq_a2: "Dieser Umrechner verwendet den exakten Umrechnungsfaktor von 2,54 cm pro Zoll, der international vereinbart ist. Alle Berechnungen sind auf zwei Dezimalstellen genau.",
            faq_q3: "Kann ich dezimale Zollwerte in Zentimeter umrechnen?",
            faq_a3: "Ja, dieser Umrechner unterstützt Dezimalwerte. Sie können Werte wie 1,5, 2,25 oder 3,75 Zoll eingeben, und der Umrechner berechnet das genaue Zentimeter-Äquivalent.",
            faq_q4: "Wie viele Zentimeter sind 1 Zoll?",
            faq_a4: "1 Zoll entspricht exakt 2,54 Zentimetern. Diese Umrechnung basiert auf der internationalen Yard-Definition von 1959.",
            faq_q5: "Warum brauche ich einen Zoll-in-Zentimeter-Umrechner?",
            faq_a5: "Verschiedene Länder verwenden unterschiedliche Messsysteme. Die USA verwendet Zoll, während die meisten anderen Länder Zentimeter verwenden. Ein Umrechner hilft Ihnen, Messungen für Kochen, DIY-Projekte, Einkäufe und mehr schnell zu übersetzen.",
            faq_q6: "Was ist der Unterschied zwischen Zoll und Zentimetern?",
            faq_a6: "Zoll sind Teil des Imperialen Messsystems, das hauptsächlich in den USA und im Vereinigten Königreich verwendet wird. Zentimeter sind Teil des metrischen Systems, das weltweit verwendet wird. 1 Zoll = 2,54 cm exakt.",
            faq_q7: "Wie rechne ich Zentimeter in Zoll um?",
            faq_a7: "Um Zentimeter in Zoll umzurechnen, teilen Sie den Zentimeterwert durch 2,54. Die Formel lautet: Zoll = cm ÷ 2,54. Zum Beispiel: 10 cm ≈ 3,94 Zoll.",
            faq_q8: "Was sind häufige Verwendungszwecke für Zoll-in-Zentimeter-Umrechnung?",
            faq_a8: "Häufige Verwendungszwecke umfassen: Messen von TV- und Monitorbildschirmgrößen, Umrechnen von Kleidergrößen, DIY- und Schreinereiprojekte, Kochrezepte mit Imperialmaßen und Verstehen von Produktdimensionen internationaler Verkäufer.",
            faq_q9: "Ist dieser Umrechner kostenlos zu verwenden?",
            faq_a9: "Ja, dieser Zoll-in-Zentimeter-Umrechner ist völlig kostenlos zu verwenden, ohne Registrierung erforderlich. Er funktioniert auf allen Geräten - Desktop, Tablet und Mobilgerät.",
            faq_q10: "Kann ich diesen Umrechner offline verwenden?",
            faq_a10: "Sobald die Seite geladen ist, funktioniert der Umrechner vollständig ohne Verbindung in Ihrem Browser. Nach dem anfänglichen Laden der Seite ist keine Internetverbindung für Umrechnungen erforderlich.",

            formula_title: "Umrechnungsformel",
            formula_in_to_cm: "1 Zoll = 2.54 Zentimeter",
            formula_cm_to_in: "1 Zentimeter = 0.393701 Zoll",
            
            quick_ref_title: "Schnellreferenz",
            quick_ref_1: "1/4 Zoll = 0.635 cm",
            quick_ref_2: "1/2 Zoll = 1.27 cm",
            quick_ref_3: "3/4 Zoll = 1.905 cm",
            quick_ref_4: "1 Zoll = 2.54 cm",
            quick_ref_5: "2 Zoll = 5.08 cm",
            quick_ref_6: "6 Zoll = 15.24 cm",
            quick_ref_7: "12 Zoll (1 Fuß) = 30.48 cm",
            
            footer_copyright: "© 2026 inch-to-cm.online - Kostenloses Online-Längen-Umrechnungstool",
            footer_tagline: "Präzise Zoll-cm und cm-Zoll Umrechnungen einfach gemacht",
            footer_partners_label: "Partner:",
            footer_partners: "Partner: OC-Role | OpenClaw101 | iTool",
            
            meta_title: "Zoll zu CM Umrechner - Kostenloses Online-Längen-Umrechnungstool",
            meta_description: "Konvertieren Sie Zoll in Zentimeter und umgekehrt sofort. Präzises, schnelles und benutzerfreundliches Längen-Umrechnungstool.",
            meta_keywords: "zoll in cm, cm in zoll, längenumrechner, messungsumrechnung"
        }
    },
    
    init() {
        const savedLang = localStorage.getItem('i18n_lang');
        const browserLang = navigator.language.split('-')[0];
        
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
        } else if (this.translations[browserLang]) {
            this.currentLang = browserLang;
        }
        
        this.updatePage();
        this.createLangSelector();
    },
    
    t(key) {
        return this.translations[this.currentLang]?.[key] || this.translations['en']?.[key] || key;
    },
    
    setLang(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('i18n_lang', lang);
            this.updatePage();
            this.updateMeta();
        }
    },
    
    updatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        document.documentElement.lang = this.currentLang;
    },
    
    updateMeta() {
        document.title = this.t('meta_title');
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = this.t('meta_description');
    },
    
    createLangSelector() {
        const selector = document.getElementById('lang-selector');
        if (!selector) return;
        
        selector.innerHTML = Object.entries(this.languages)
            .map(([code, info]) => `
                <button class="lang-btn ${code === this.currentLang ? 'active' : ''}" data-lang="${code}" title="${info.name}">
                    ${info.flag}
                </button>
            `).join('');
        
        selector.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLang(btn.dataset.lang);
                selector.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => i18n.init());
