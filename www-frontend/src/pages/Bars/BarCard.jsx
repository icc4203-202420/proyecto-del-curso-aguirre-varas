import PropTypes from "prop-types";

function BarCard() {
  return (
    <div>
      <h1>Bar</h1>
    </div>
  );
}

export default BarCard;

BarCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
