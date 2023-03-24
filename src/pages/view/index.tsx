import React from "react";
import GoogleMapReact from "google-map-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  incrementAsync,
  ProductRtn,
} from "../../features/product/productSlice";
import {
  ClockIcon,
  CogIcon,
  CurrencyDollarIcon,
  HomeModernIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const View: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(incrementAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <MainSection Company={CompanyView} editable />
      <VideoSection />
      <DetailSection />
    </div>
  );
};

const AnyReactComponent: React.FC<{ text: string }> = ({ text }) => (
  <div>{text}</div>
);

const SimpleMap: React.FC<{
  lat: number;
  lng: number;
}> = ({ lat, lng }) => {
  const defaultProps = {
    center: {
      lat,
      lng,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          //@ts-ignore
          lat={lat}
          lng={lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
};

const CompanyView: React.FC = () => {
  const { company } = useAppSelector((state) => state.product.value);
  return (
    <React.Fragment>
      <p>{`
    ${company.address.street} 
    ${company.address.house}
    ${company.address.zipCode},
    ${company.address.city.name},
    ${company.address.country.name}
      `}</p>
      <SimpleMap
        lat={Number(company.address.latitude)}
        lng={Number(company.address.longitude)}
      />
    </React.Fragment>
  );
};

const UserSection: React.FC = () => {
  const { user, company } = useAppSelector((state) => state.product.value);
  return (
    <div>
      <h2>Offered by</h2>
      <img src={company.logo} alt={company.name} className="h-10" />
      <div className="flex  align-middle self-center mr-4 items-center">
        <div>
          <img
            src={user.profilePicture}
            alt={`${user.firstName}-${user.lastName}`}
            className="rounded-full w-20 h-20"
          />
        </div>
        <div>
          <h2 className="card-title">
            {user.firstName} {user.lastName}
          </h2>
          <p>{company.name}</p>
        </div>
      </div>
    </div>
  );
};

interface MainSectionProps {
  Company?: React.FC;
  editable?: boolean;
  Description?: React.FC<{ product: ProductRtn }>;
  children?: React.ReactNode;
}

const DefaultDescription: React.FC<{ product: ProductRtn }> = ({ product }) => {
  return (
    <div>
      {" "}
      <h2 className="card-title">{product.name}</h2>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </div>
  );
};

export const MainSection: React.FC<MainSectionProps> = ({
  Company,
  editable = false,
  Description = DefaultDescription,
  children,
}) => {
  const product = useAppSelector((state) => state.product.value);
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl  rounded-md border border-gray-300 m-6">
      <div className="card-body  w-full md:w-2/3">
        <img
          height="120"
          width="100"
          src={product.picture}
          alt={product.name}
        />
        {children ?? <Description product={product} />}
      </div>
      <div className="w-full md:w-1/2">
        <UserSection />
        {Company && <Company />}
      </div>
      {editable && (
        <Link to="/product/edit">
          <button className="btn btn-primary">Edit</button>
        </Link>
      )}
    </div>
  );
};

const YoutubeLinkToEmbed = (url: string) => {
  //https://stackoverflow.com/questions/7168987/how-to-convert-a-youtube-video-url-to-the-iframe-embed-code-using-jquery-on-pag#:~:text=//%20Grab%20text%0A%20%20%20%20var,matches%5B1%5D%0A%20%20%20%20%7D)%3B
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
  const match = regex.exec(url);
  if (match) {
    return "http://www.youtube.com/embed/" + match[1];
  }
  return url;
};

const VideoSection: React.FC = () => {
  const product = useAppSelector((state) => state.product.value);
  return (
    <div>
      <div className="card  bg-base-100 shadow-xl justify-center w-max-fit rounded-md border border-gray-300 m-6">
        <div className="card-body">
          <h2 className="card-title">Video</h2>
          <iframe
            height="315"
            src={YoutubeLinkToEmbed(product.video)}
            title={product.name}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const getIcons = (icon: string) => {
  switch (icon) {
    case "categories":
      return <CogIcon className="h-6 w-6 text-blue-500" />;
    case "trl":
      return <ClockIcon className="h-6 w-6 text-blue-500" />;
    case "businessModels":
      return <HomeModernIcon className="h-6 w-6 text-blue-500" />;
    case "costs":
      return <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />;
  }
};

/** Details Section */

const DetailSection: React.FC = () => {
  const product = useAppSelector((state) => state.product.value);
  return (
    <div>
      <div className="card  bg-base-100 shadow-xl justify-center w-max-fit rounded-md border border-gray-300 m-6">
        <div className="card-body">
          <h2 className="card-title">Offer details</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          {["categories", "trl", "businessModels", "costs"].map((item) => {
            return (
              <div className="flex flex-row items-center justify-center w-1/2 gap-1">
                {getIcons(item)}
                <div>
                  <div className="text-gray-500 text-sm ml-4">{item}</div>
                  {product[item as keyof ProductRtn]
                    ? Array.from(
                        product[item as keyof ProductRtn] as Iterable<{
                          name: string;
                          id: number;
                        }>
                      )
                        .flat()
                        .map((input: { name: string; id: number }) => {
                          return (
                            <div id={input.id.toString()} className="badge">
                              {input.name}
                            </div>
                          );
                        })
                    : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default View;
