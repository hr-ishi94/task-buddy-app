type CircleTypes = {
  section: 'full' | 'r-full' | 'bl-full';
};

const Circles: React.FC<CircleTypes> = ({ section }) => {
  return (
    <>
      {section === 'full' && (
        <svg width="300" height="300" viewBox="0 0 200 200">
          <circle className="opacity-50" cx="100" cy="100" r="40" stroke="#7B1984" strokeWidth="1" fill="none" />
          <circle className="opacity-30" cx="100" cy="100" r="60" stroke="#7B1984" strokeWidth="1" fill="none" />
          <circle className="opacity-20" cx="100" cy="100" r="80" stroke="#7B1984" strokeWidth="1" fill="none" />
        </svg>
      )}

      {section === 'bl-full' && (
        <div className="ml-3 mb-5">
          <svg width="300" height="300" viewBox="0 0 200 200">
            {/* Outer Quarter Circle */}
            <path className="opacity-20" d="M 100,100 L 10,100 A 90,90 0 0,0 100,190 Z" fill="none" stroke="#7B1984" strokeWidth="1" />
            
            {/* Medium Quarter Circle */}
            <path className="opacity-30" d="M 100,100 L 30,100 A 70,70 0 0,0 100,170 Z" fill="none" stroke="#7B1984" strokeWidth="1" />
            
            {/* Small Quarter Circle */}
            <path className="opacity-50" d="M 100,100 L 50,100 A 50,50 0 0,0 100,150 Z" fill="none" stroke="#7B1984" strokeWidth="1" />
          </svg>
        </div>
      )}

      {section === 'r-full' && (
        <div>
          <svg width="300" height="300" viewBox="0 0 200 200">
            {/* Outer Half Circle */}
            <path className="opacity-20" d="M 100,10 A 90,90 0 0,1 100,190" fill="none" stroke="#7B1984" strokeWidth="1" />
            
            {/* Medium Half Circle */}
            <path className="opacity-30" d="M 100,30 A 70,70 0 0,1 100,170" fill="none" stroke="#7B1984" strokeWidth="1" />
            
            {/* Small Half Circle */}
            <path className="opacity-50" d="M 100,50 A 50,50 0 0,1 100,150" fill="none" stroke="#7B1984" strokeWidth="1" />
          </svg>
        </div>
      )}
    </>
  );
};

export default Circles;
