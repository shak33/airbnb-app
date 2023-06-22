'use client';

import { useSearchParams, usePathname} from 'next/navigation';

import Container from '../../Container';

import CategoryBox from '../../CategoryBox';

import { categories } from './constants';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathName = usePathname();

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map(({label, description, icon}) => (
          <CategoryBox
            key={label}
            label={label}
            icon={icon}
            selected={category === label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;