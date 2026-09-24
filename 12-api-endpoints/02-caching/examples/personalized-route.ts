// Isolated educational example of private, user-specific data.
// Query parameters must not be used as authentication in a real application.
// Different users produce different results.
// Sharing one cache entry across all users would be incorrect and potentially unsafe.
// Authentication and authorization are outside this lesson.

type Profile = {
  userId: string;
  displayName: string;
};

function getProfileForUser(userId: string): Profile {
  return {
    userId,
    displayName: `User ${userId}`,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return Response.json(
      {
        error: "userId is required.",
      },
      {
        status: 400,
      }
    );
  }

  const profile = getProfileForUser(userId);

  return Response.json(profile);
}
