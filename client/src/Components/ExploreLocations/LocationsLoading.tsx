import Placeholder from "react-bootstrap/Placeholder";
import loading from "../../assets/loading.png";
const LocationsLoading = () => {
  return Array.from({ length: 5 }).map((_, i) => (
    <div key={i} className="flex items-center bg-teal mt-4">
      <img src={loading} alt="Loading..." className="mr-4" />
      <div className="flex flex-col space-y-2 w-full h-[150px] pt-3">
        <Placeholder as="p" animation="glow">
          <Placeholder xs={3} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder as="p" animation="glow">
          <Placeholder xs={4} />
        </Placeholder>
      </div>
    </div>
  ));
};

export default LocationsLoading;
