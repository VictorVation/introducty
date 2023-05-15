export class RequiresProPlanError extends Error {
  constructor(
    message = "Limit of 3 sites reached. Please upgrade to the PRO plan."
  ) {
    super(message);
  }
}
