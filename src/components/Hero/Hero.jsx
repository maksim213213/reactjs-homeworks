import { Link } from "react-router-dom";
import heroImage from "../../assets/images/homeBanner.png";
import trustpilotIcon from "../../assets/images/trustpilotIcon.svg";

const RATING = 4.8;
const MAX_STARS = 5;

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill={filled ? "#35B8BE" : "none"}
    stroke="#35B8BE"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
    />
  </svg>
);

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-bgLight px-8 py-16 lg:px-16 lg:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-medium leading-tight text-textDark sm:text-5xl lg:text-6xl">
              Beautiful food & takeaway,{" "}
              <span className="text-primary">delivered</span> to your door.
            </h1>

            <p className="mx-auto mt-6 max-w-md text-textGray sm:mx-0 lg:mx-0">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500.
            </p>

            <div className="mt-8">
              <Link
                to="/order"
                className="inline-block rounded-md bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90 transition"
              >
                Place an Order
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 lg:items-start">
              <div className="flex items-center gap-2">
                <img src={trustpilotIcon} alt="Trustpilot" className="h-6" />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: MAX_STARS }, (_, i) => (
                    <StarIcon key={i} filled={i < Math.round(RATING)} />
                  ))}
                </div>
              </div>
              <span className="text-sm text-textGray">
                <span className="font-medium text-primary">{RATING} out of 5</span>{" "}
                based on 2000+ reviews
              </span>
            </div>
          </div>

          <div className="relative mt-12 flex-1 lg:mt-0">
            <img
              src={heroImage}
              alt="delicious food"
              className="mx-auto rounded-3xl object-cover"
              style={{ maxWidth: "500px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
