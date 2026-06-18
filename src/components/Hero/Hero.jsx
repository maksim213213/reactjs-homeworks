// src/components/Hero/Hero.jsx
import heroImage from "../../assets/images/homeBanner.png";
import trustpilotIcon from "../../assets/images/trustpilotIcon.svg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-bgLight px-8 py-16 lg:px-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-medium leading-tight text-textDark sm:text-5xl lg:text-6xl">
              Beautiful food & takeaway, <span className="text-primary">delivered</span> to your door.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-textGray sm:mx-0 lg:mx-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
            </p>

            <div className="mt-8">
              <a
                href="#"
                className="inline-block rounded-md bg-primary px-8 py-3 font-medium text-white transition hover:bg-primary/90"
              >
                Place an Order
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 lg:justify-start">
              <img src={trustpilotIcon} alt="Trustpilot" className="h-6" />
              <span className="text-sm text-textGray">
                <span className="font-medium text-primary">4.8 out of 5</span> based on 2000+ reviews
              </span>
            </div>
          </div>

          <div className="relative mt-12 flex-1 lg:mt-0">
            <div className="relative">
              <img
                src={heroImage}
                alt="delicious food"
                className="mx-auto rounded-3xl object-cover"
                style={{ maxWidth: '500px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;