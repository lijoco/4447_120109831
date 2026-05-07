// Taken direct from tutorials.
// Small edits were made. ie changed naming convensions. GoalCard instead of StudentCard. Editied using AI - https://chat.deepseek.com/share/rgozpjt7fdeamxss41
import { db } from '../db/client';
import { seedGoalsIfEmpty } from '../db/seed';

jest.mock('../db/client', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
  },
}));

const mockDb = db as unknown as { select: jest.Mock; insert: jest.Mock };

describe('seedGoalsIfEmpty', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('inserts goals when the table is empty', async () => {
    const mockValues = jest.fn().mockResolvedValue(undefined);
    const mockFrom = jest.fn().mockResolvedValue([]);
    mockDb.select.mockReturnValue({ from: mockFrom });
    mockDb.insert.mockReturnValue({ values: mockValues });

    // if the goals table is empty, go to db/seed.ts and run the seedGoalsIfEmpty function to insert the goals
    await seedGoalsIfEmpty();

    expect(mockDb.insert).toHaveBeenCalled();
    expect(mockValues).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Learn React Native' }),
        expect.objectContaining({ title: 'Build a goal tracker' }),
        expect.objectContaining({ title: 'Add testing' }),
      ])
    );
  });

  it('does nothing when goals already exist', async () => {
    const mockFrom = jest.fn().mockResolvedValue([
      { id: 1, title: 'Existing Goal', description: 'Test', deadline: '2024-12-31', count: 0 },
    ]);
    mockDb.select.mockReturnValue({ from: mockFrom });

    await seedGoalsIfEmpty();

    expect(mockDb.insert).not.toHaveBeenCalled();
  });
});
