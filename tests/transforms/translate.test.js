import translate from 'src/transforms/translate';

describe('translate', () => {
  let doTranslate = translate(10, 10);
  it('translates', () => {
    doTranslate([{x: 5, y: 5}])
      .should
      .resultIn({x: 15, y: 15});
  });
});
