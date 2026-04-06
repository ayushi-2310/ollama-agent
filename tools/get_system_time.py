from datetime import datetime

def get_system_time():
    """
    Returns the current system time.
    """
    now = datetime.now()
    return now.strftime("%Y-%m-%d %H:%M:%S")


if __name__ == "__main__":
    print(get_system_time())
