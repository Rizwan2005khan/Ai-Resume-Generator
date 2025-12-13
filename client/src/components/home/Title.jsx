import React from 'react';

const Title = ({ title, description }) => {
  return (
    <div className='text-center mt-6 text-slate-700 max-w-3xl mx-auto'>
      <h2 className='text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
        {title}
      </h2>
      <p className='text-base sm:text-lg text-gray-600 leading-relaxed'>
        {description}
      </p>
    </div>
  );
};

export default Title;