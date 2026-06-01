import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const OrderPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bgLight flex items-center justify-center px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-textDark mb-4">Order</h1>
          <p className="text-textGray">Your orders will appear here. Coming soon!</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderPage;
