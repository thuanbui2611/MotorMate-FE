export function getPagination(
  currentPage: number,
  totalPage: number,
  maxLength: number
) {
  const res: Array<number> = [];

  // handle totalPage less than maxLength
  if (totalPage <= maxLength) {
    for (let i = 1; i <= totalPage; i++) {
      res.push(i);
    }
  }

  // handle ellipsis logics
  else {
    const firstPage = 1;
    const confirmedPagesCount = 3;
    const deductedMaxLength = maxLength - confirmedPagesCount;
    const sideLength = deductedMaxLength / 2;

    // handle ellipsis in the middle
    if (
      currentPage - firstPage < sideLength ||
      totalPage - currentPage < sideLength
    ) {
      for (let j = 1; j <= sideLength + firstPage; j++) {
        res.push(j);
      }

      res.push(NaN);

      for (let k = totalPage - sideLength; k <= totalPage; k++) {
        res.push(k);
      }
    }

    // handle two ellipsis
    else if (
      currentPage - firstPage >= deductedMaxLength &&
      totalPage - currentPage >= deductedMaxLength
    ) {
      const deductedSideLength = sideLength - 1;

      res.push(1);
      res.push(NaN);

      for (
        let l = currentPage - deductedSideLength;
        l <= currentPage + deductedSideLength;
        l++
      ) {
        res.push(l);
      }

      res.push(NaN);
      res.push(totalPage);
    }

    // handle ellipsis not in the middle
    else {
      const isNearFirstPage = currentPage - firstPage < totalPage - currentPage;
      let remainingLength = maxLength;

      if (isNearFirstPage) {
        for (let m = 1; m <= currentPage + 1; m++) {
          res.push(m);
          remainingLength -= 1;
        }

        res.push(NaN);
        remainingLength -= 1;

        for (let n = totalPage - (remainingLength - 1); n <= totalPage; n++) {
          res.push(n);
        }
      } else {
        for (let o = totalPage; o >= currentPage - 1; o--) {
          res.unshift(o);
          remainingLength -= 1;
        }

        res.unshift(NaN);
        remainingLength -= 1;

        for (let p = remainingLength; p >= 1; p--) {
          res.unshift(p);
        }
      }
    }
  }

  return res;
}
