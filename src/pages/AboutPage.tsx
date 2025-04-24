
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">О компании ВЫБОР+</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-lg mb-4">
              Компания "ВЫБОР+" - ведущий поставщик строительных материалов в регионе с более чем 15-летним опытом работы.
            </p>
            <p className="mb-4">
              Мы предлагаем широкий ассортимент высококачественных строительных материалов для любых видов строительных и ремонтных работ: от фундамента до кровли.
            </p>
            <p className="mb-4">
              Наша миссия - обеспечивать клиентов качественными строительными материалами по доступным ценам и с первоклассным сервисом.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600"
              alt="Наша команда"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Наши преимущества</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Широкий ассортимент</h3>
            <p className="text-gray-700">Более 10 000 наименований товаров для строительства и ремонта</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Гарантия качества</h3>
            <p className="text-gray-700">Мы работаем только с проверенными производителями и поставщиками</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Удобная доставка</h3>
            <p className="text-gray-700">Оперативная доставка в удобное для вас время по всему региону</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Профессиональная консультация</h3>
            <p className="text-gray-700">Наши специалисты помогут выбрать оптимальные материалы для вашего проекта</p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">История компании</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
          <p className="mb-3">
            Компания "ВЫБОР+" была основана в 2008 году группой профессионалов строительной отрасли. 
          </p>
          <p className="mb-3">
            Начав с небольшого склада и ограниченного ассортимента, мы постепенно расширялись, увеличивая как площадь наших складских помещений, так и номенклатуру товаров.
          </p>
          <p className="mb-3">
            В 2015 году мы открыли собственный логистический центр, что позволило значительно улучшить скорость и качество доставки товаров нашим клиентам.
          </p>
          <p>
            Сегодня "ВЫБОР+" - это современная компания с большим опытом работы на рынке строительных материалов, обширной клиентской базой и репутацией надежного поставщика.
          </p>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">Наши клиенты</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="mb-3">
            Мы сотрудничаем как с частными клиентами, так и с крупными строительными компаниями, предлагая индивидуальный подход к каждому заказу.
          </p>
          <p>
            Среди наших постоянных клиентов - ведущие строительные компании региона, частные застройщики, ремонтные бригады и розничные покупатели.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
