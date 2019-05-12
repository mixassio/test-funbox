import * as actions from '../src/actions';


describe('actions', () => {
  it('addPointSuccess', () => {
    const add = actions.addPointSuccess({ name: 'point', center: [55.75, 37.57], id: 0 });
    expect(add).toEqual({ type: 'POINT_ADD_SUCCESS', payload: { name: 'point', center: [55.75, 37.57], id: 0 } });
  });

  it('addPointFailure', () => {
    const add = actions.addPointFailure();
    expect(add).toEqual({ type: 'POINT_ADD_FAILURE' });
  });

  it('addPointRequest', () => {
    const add = actions.addPointRequest();
    expect(add).toEqual({ type: 'POINT_ADD_REQUEST' });
  });
});
