const db = require('../../../config/dbConfig.js');
const refreshrHelper = require('../refreshrHelper.js');

// afterAll(async (done) => {
// 	await db
// 		.raw('TRUNCATE TABLE refreshrs RESTART IDENTITY CASCADE')
// 		.then(() => db.seed.run());
// 	done();
// });

describe('GET query to refreshrs db', () => {
  it('should return all refreshrs', async (done) => {
    const allRefreshrs = await refreshrHelper.getAll();
    expect(allRefreshrs).toHaveLength(100)
    done();
  });
  it('should return 1 refreshr', async (done) => {
    const selectedRefreshr = await refreshrHelper.getRefreshr(1);
    expect(Object.keys(selectedRefreshr).sort()).toEqual(['id', 'date', 'refreshrs'].sort());
    done();
  });
});

describe('INSERT query to refreshrs db', () => {
  it('should add refreshr to db and return the ID', async (done) => {
    const added = await refreshrHelper.addRefreshr({
      date: '2/15/19'
    });

    expect(added).toEqual(101);
    done();
  });

  it('should return an object with the correct keys', async (done) => {
    const added = await refreshrHelper.addRefreshr({
      date: '2/16/19'
    });
    const newRefreshr = await refreshrHelper.getRefreshr(added);

    expect(Object.keys(newRefreshr).sort()).toEqual(['id', 'date', 'refreshrs'].sort());
    done();
  });
});

describe('UPDATE query to refreshr db', () => {
  it('should update refreshr with specified ID and return count of 1', async (done) => {
    const count = await refreshrHelper.updateRefreshr(1, {
      date: '2/17/19'
    });

    expect(count).toEqual(1);
    done();
  });
});

describe('DELETE query to refreshr db', () => {
  it('should return a count of 1 when deleting specified refreshr', async (done) => {
    const count = await refreshrHelper.deleteRefreshr(101);

    expect(count).toEqual(1);
    done();
  });
});
