/**
 * A simple SpinLock
 * @category MusicPlayer
 */
class SpinLock {
  /**
   * The state of the SpinLock (either locked or unlocked)
   * @type {boolean}
   * @private
   */
  private locked: boolean;

  /**
   * @constructor
   */
  constructor() {
    this.locked = false;
  }

  /**
   * Attempts to lock the spinlock. If already locked
   * the calling method has to wait until it is unlocked
   */
  public lock() : void {
    while (this.locked) {}
    this.locked = true;
  }

  /**
   * Unlocks the spinlock
   */
  public unlock() : void {
    this.locked = false;
  }
}

export default SpinLock;
