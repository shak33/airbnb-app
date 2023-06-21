'use client';

import Container from '../../Container';

import CategoryBox from '../../CategoryBox';

import { categories } from './constants';

const Categories = () => {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map(({label, description, icon}) => (
          <CategoryBox
            key={label}
            label={label}
            description={description}
            icon={icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;