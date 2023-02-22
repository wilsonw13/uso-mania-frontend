import { PrismaClient } from '@prisma/client';
// import fs from 'fs';
export const prisma = new PrismaClient();

export async function resetDatabase() {
  const deleteUsers = prisma.user.deleteMany();
  const deleteUserSettings = prisma.userSettings.deleteMany();
  const deleteUserStats = prisma.userStats.deleteMany();
  const deletePlayedBeatmaps = prisma.userPlayedBeatmap.deleteMany();
  const deleteUserScores = prisma.userScoreEntry.deleteMany();

  await prisma.$transaction([
    deleteUsers,
    deleteUserSettings,
    deleteUserStats,
    deletePlayedBeatmaps,
    deleteUserScores,
  ]);
}

// export async function getUser(id: string) {
//   try {
//     return await prisma.user.findUniqueOrThrow({
//       where: {
//         userId: id,
//       },
//     });
//   } catch (error) {
//     return;
//   }
// }

export async function createUser(id: string, username: string) {
  await prisma.user.create({
    data: {
      userId: id,
      username: username,
      settings: {
        create: {},
      },
      stats: {
        create: {},
      },
    },
  });
}

export async function updateUser(
  id: string,
  {
    pfpId,
    description,
    characters,
    volumeMaster,
    volumeMusic,
    volumeHitSound,
    scrollSpeed,
    keys1,
    keys2,
    keys3,
    keys4,
    keys5,
    keys6,
    keys7,
    keys8,
    keys9,
  }: {
    pfpId?: number | undefined;
    description?: string | undefined;
    characters?: string | undefined;
    volumeMaster?: number | undefined;
    volumeMusic?: number | undefined;
    volumeHitSound?: number | undefined;
    scrollSpeed?: number | undefined;
    keys1?: string | undefined;
    keys2?: string | undefined;
    keys3?: string | undefined;
    keys4?: string | undefined;
    keys5?: string | undefined;
    keys6?: string | undefined;
    keys7?: string | undefined;
    keys8?: string | undefined;
    keys9?: string | undefined;
  }
) {
  await prisma.user.update({
    where: {
      userId: id,
    },
    data: {
      pfpId: pfpId,
      description: description,
      characters: characters,
      settings: {
        update: {
          volumeMaster: volumeMaster,
          volumeMusic: volumeMusic,
          volumeHitSound: volumeHitSound,
          scrollSpeed: scrollSpeed,
          keys1: keys1,
          keys2: keys2,
          keys3: keys3,
          keys4: keys4,
          keys5: keys5,
          keys6: keys6,
          keys7: keys7,
          keys8: keys8,
          keys9: keys9,
        },
      },
    },
  });
}

export async function updateUsername(id: string, username: string) {
  try {
    await prisma.user.findUniqueOrThrow({
      where: {
        username: username,
      },
    });

    return 'Error: Username already exists in database';
  } catch (e) {
    if (e.name === 'NotFoundError') {
      await prisma.user.update({
        where: {
          userId: id,
        },
        data: {
          username: username,
        },
      });
    }
  }
}

export async function submitScore(
  id: string,
  {
    beatmapSetId,
    beatmapId,
    score,
    accuracy,
    maxCombo,
    grade,
  }: {
    beatmapSetId: number;
    beatmapId: number;
    score: number;
    accuracy: number;
    maxCombo: number;
    grade: string;
  }
) {
  const idObj = {
    userId: id,
    beatmapSetId: beatmapSetId,
    beatmapId: beatmapId,
  };

  const bmRecord = await prisma.userPlayedBeatmap.findUnique({
    where: {
      userId_beatmapSetId_beatmapId: idObj,
    },
  });

  if (bmRecord) {
    await prisma.userPlayedBeatmap.update({
      where: {
        userId_beatmapSetId_beatmapId: idObj,
      },
      data: {
        highestScore: score > bmRecord.highestScore ? score : undefined,
        highestAccuracy:
          accuracy > bmRecord.highestAccuracy ? accuracy : undefined,
        highestMaxCombo:
          maxCombo > bmRecord.highestMaxCombo ? maxCombo : undefined,
        highestGrade: accuracy > bmRecord.highestAccuracy ? grade : undefined,

        playCount: {
          increment: 1,
        },

        entries: {
          create: {
            score: score,
            accuracy: accuracy,
            maxCombo: maxCombo,
            grade: grade,
          },
        },
      },
    });

    const numEntries = await prisma.userScoreEntry.count({
      where: idObj,
    });

    if (numEntries > 10) {
      const lowScoreEntries = await prisma.userScoreEntry.findMany({
        where: idObj,
        orderBy: [
          {
            score: 'asc',
          },
          {
            accuracy: 'asc',
          },
          {
            maxCombo: 'asc',
          },
        ],
        take: numEntries - 10,
        select: {
          id: true,
        },
      });

      const entryIds = lowScoreEntries.map((obj) => {
        return obj.id;
      });

      await prisma.userScoreEntry.deleteMany({
        where: {
          id: {
            in: entryIds,
          },
        },
      });
    }
  } else {
    await prisma.userPlayedBeatmap.create({
      data: {
        userId: id,
        beatmapSetId: beatmapSetId,
        beatmapId: beatmapId,

        highestScore: score,
        highestAccuracy: accuracy,
        highestMaxCombo: maxCombo,
        highestGrade: grade,

        playCount: 1,

        entries: {
          create: {
            score: score,
            accuracy: accuracy,
            maxCombo: maxCombo,
            grade: grade,
          },
        },
      },
    });

    await prisma.userStats.update({
      where: {
        userId: id,
      },
      data: {
        playCountUnique: {
          increment: 1,
        },
      },
    });
  }

  const agg = await prisma.userPlayedBeatmap.aggregate({
    where: {
      userId: id,
    },
    _avg: {
      highestScore: true,
      highestAccuracy: true,
    },
    _max: {
      highestMaxCombo: true,
    },
  });

  const aggGrade = await prisma.userPlayedBeatmap.groupBy({
    where: {
      userId: id,
    },
    by: ['highestGrade'],
    _count: {
      _all: true,
    },
  });

  const reformatAggGrade: {
    [key: string]: number;
  } = {};

  aggGrade.forEach((obj) => {
    reformatAggGrade[obj.highestGrade] = obj._count._all;
  });

  await prisma.userStats.update({
    where: {
      userId: id,
    },
    data: {
      averageScore: agg._avg.highestScore
        ? Math.round(agg._avg.highestScore)
        : undefined,
      averageAccuracy: agg._avg.highestAccuracy
        ? agg._avg.highestAccuracy
        : undefined,
      highestMaxCombo: agg._max.highestMaxCombo
        ? agg._max.highestMaxCombo
        : undefined,

      SS: reformatAggGrade.SS ? reformatAggGrade.SS : undefined,
      S: reformatAggGrade.S ? reformatAggGrade.S : undefined,
      A: reformatAggGrade.A ? reformatAggGrade.A : undefined,
      B: reformatAggGrade.B ? reformatAggGrade.B : undefined,
      C: reformatAggGrade.C ? reformatAggGrade.C : undefined,
      D: reformatAggGrade.D ? reformatAggGrade.D : undefined,
    },
  });
}

export async function getUserSongScores(
  id: string,
  {
    beatmapSetId,
    beatmapId,
  }: {
    beatmapSetId: number;
    beatmapId: number;
  }
) {
  return await prisma.userScoreEntry.findMany({
    where: {
      userId: id,
      beatmapSetId: beatmapSetId,
      beatmapId: beatmapId,
    },
  });
}

export async function getGlobalLeaderboard() {
  const leaderboard = await prisma.userStats.findMany({
    where: {
      playCountUnique: {
        gte: 3,
      },
    },
    orderBy: [
      { averageScore: 'desc' },
      { averageAccuracy: 'desc' },
      { highestMaxCombo: 'desc' },
    ],
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  //fs.writeFileSync('logs/global-leaderboard.json', JSON.stringify(leaderboard));
  return leaderboard;
}

export async function getSongLeaderboard(
  beatmapSetId: number,
  beatmapId: number
) {
  const leaderboard = await prisma.userPlayedBeatmap.findMany({
    where: {
      beatmapSetId: beatmapSetId,
      beatmapId: beatmapId,
    },
    orderBy: [
      { highestScore: 'desc' },
      { highestAccuracy: 'desc' },
      { highestMaxCombo: 'desc' },
    ],
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  //fs.writeFileSync('logs/song-leaderboard.json', JSON.stringify(leaderboard));
  return leaderboard;
}

export async function main() {
  // await createUser("1", "user1");
  // await createUser("2", "user2");
  // await createUser("3", "user3");

  // await submitScore("1", {
  //   beatmapId: 50,
  //   beatmapSetId: 50,
  //   score: 1123000,
  //   accuracy: Math.random(),
  //   maxCombo: 102300,
  //   grade: "A",
  // });
  // await submitScore("2", {
  //   beatmapId: 50,
  //   beatmapSetId: 50,
  //   score: 1123234,
  //   accuracy: Math.random(),
  //   maxCombo: 5326,
  //   grade: "A",
  // });
  // await submitScore("3", {
  //   beatmapId: 50,
  //   beatmapSetId: 50,
  //   score: 2123512,
  //   accuracy: Math.random(),
  //   maxCombo: 31323,
  //   grade: "C",
  // });
  // await getGlobalLeaderboard();
  // await getSongLeaderboard(3, 3);
  // await log();
  console.log('main()');
}
