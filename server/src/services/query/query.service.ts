import { Injectable } from '@nestjs/common';
import {
  BasicQuery,
  FilterOperator,
  FilterState,
  SortState,
} from '../../@types/general';
import { BasicQueryDto } from './dto/query.dto';

@Injectable()
export class BasicQueryService {
  extractFilterState(filters?: string[]): FilterState[] {
    if (!filters?.length) return [];

    return filters
      .map((filter) => {
        const parts = filter.split(':');
        if (parts.length < 2) return null;

        const [key, operator = 'eq', value] = parts;

        return {
          key,
          operator: operator as FilterOperator,
          value,
        };
      })
      .filter(Boolean) as FilterState[];
  }

  extractSortState(sorts?: string[]): SortState[] {
    if (!sorts) return [];
    return sorts.map((sort) => {
      const splittedSort = sort.split(':');
      return {
        key: splittedSort[0],
        value: splittedSort[1] as SortState['value'],
      };
    });
  }

  mapToBasicQuery(queryDto: BasicQueryDto): BasicQuery {
    const { filter, sort, from, limit, page, to } = queryDto;
    const filters = this.extractFilterState(filter);
    const sorts = this.extractSortState(sort);

    return {
      filters,
      sort: sorts,
      limit,
      page,
      from,
      to,
    };
  }
}
